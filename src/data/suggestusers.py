# suggest_users.py
#
# Uses your provided CSV (user_reviews.csv) with columns:
# Age,Gender,Favorite_Genre,Preferred_Ending,Rating
#
# Outputs suggested users for a target user based on:
# 1) Same genre (required)
# 2) Closest rating ("common rating" = minimal rating difference)
# Tie-breakers: closest age, then higher rating

import os
import pandas as pd

CSV_NAME = "user_reviews.csv"   # must be in the same folder as this script
TARGET_USER_ID = "U0001"        # U0001 = first row in the CSV
TOP_N = 10

def load_data():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    csv_path = os.path.join(script_dir, CSV_NAME)

    if not os.path.exists(csv_path):
        raise FileNotFoundError(
            f"Could not find '{CSV_NAME}' in: {script_dir}\n"
            f"Place '{CSV_NAME}' in the same folder as suggest_users.py"
        )

    df = pd.read_csv(csv_path)

    required_cols = ["Age", "Gender", "Favorite_Genre", "Preferred_Ending", "Rating"]
    missing = [c for c in required_cols if c not in df.columns]
    if missing:
        raise ValueError(f"Missing columns in CSV: {missing}\nFound: {list(df.columns)}")

    # Add stable IDs based on row order
    df = df.copy()
    df["user_id"] = [f"U{i:04d}" for i in range(1, len(df) + 1)]
    return df

def suggest_users(df, target_user_id, top_n=10):
    if target_user_id not in set(df["user_id"]):
        raise ValueError(
            f"Target user_id '{target_user_id}' not found. "
            f"Valid range: U0001..U{len(df):04d}"
        )

    target = df.loc[df["user_id"] == target_user_id].iloc[0]

    # Required: same genre
    pool = df[df["Favorite_Genre"] == target["Favorite_Genre"]].copy()
    pool = pool[pool["user_id"] != target_user_id]

    if pool.empty:
        return target, pool

    # "Common rating" = closest rating
    pool["rating_diff"] = (pool["Rating"] - target["Rating"]).abs()

    # Tie-breakers
    pool["age_diff"] = (pool["Age"] - target["Age"]).abs()

    # Sort: closest rating, then closest age, then higher rating
    pool = pool.sort_values(
        by=["rating_diff", "age_diff", "Rating"],
        ascending=[True, True, False]
    )

    return target, pool.head(top_n)

def main():
    df = load_data()
    target, recs = suggest_users(df, TARGET_USER_ID, TOP_N)

    print("Target user:")
    print(
        f"{target['user_id']} | Age {target['Age']} | {target['Gender']} | "
        f"{target['Favorite_Genre']} | {target['Preferred_Ending']} | Rating {target['Rating']}"
    )

    print(f"\nSuggested users (same genre + closest rating), TOP {TOP_N}:")
    if recs.empty:
        print("(No matches found.)")
        return

    for _, u in recs.iterrows():
        print(
            f"- {u['user_id']} | Rating {u['Rating']} (diff {u['rating_diff']}) | "
            f"Age {u['Age']} (diff {u['age_diff']}) | "
            f"Ending {u['Preferred_Ending']} | {u['Gender']}"
        )

if __name__ == "__main__":
    main()
    