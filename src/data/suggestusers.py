import os
import pandas as pd

# ----------------------------
# SETTINGS YOU CAN CHANGE
# ----------------------------

# This is the filename of your CSV.
# The script expects this CSV to be in the SAME folder as this Python file.
CSV_NAME = "user_reviews.csv"

# How many similar users you want to print/save.
TOP_N = 10


# ----------------------------
# LOAD THE CSV DATA
# ----------------------------
def load_data():
    # __file__ is the path to THIS python file.
    # We use it so the script works no matter what directory you run it from.
    script_dir = os.path.dirname(os.path.abspath(__file__))

    # Build the full path: "<this_script_folder>/user_reviews.csv"
    csv_path = os.path.join(script_dir, CSV_NAME)

    # If the file is not there, stop and show an error.
    if not os.path.exists(csv_path):
        raise FileNotFoundError(
            f"Could not find '{CSV_NAME}' in this folder: {script_dir}\n"
            f"Put '{CSV_NAME}' next to this .py file."
        )

    # Read the CSV into a DataFrame (a table-like structure in pandas).
    df = pd.read_csv(csv_path)

    # Make sure the CSV has the columns we need.
    required_cols = ["User_ID", "Age", "Gender", "Favorite_Genre", "Preferred_Ending", "Rating"]
    missing = [c for c in required_cols if c not in df.columns]
    if missing:
        raise ValueError(f"Your CSV is missing these columns: {missing}")

    # Force User_ID to be a string.
    # Why: Sometimes CSV reads IDs as numbers (1000) and sometimes as strings ("1000").
    # Converting to string avoids mismatches.
    df = df.copy()
    df["User_ID"] = df["User_ID"].astype(str)

    return df


# ----------------------------
# MAIN MATCHING LOGIC
# ----------------------------
def suggest_users_by_genre_and_rating(df, user_id, top_n=10):
    # Make sure user_id is string to match df["User_ID"]
    user_id = str(user_id)

    # 1) Find the current user's row in the CSV.
    #    This is how we "get the current user's tastes".
    target_rows = df[df["User_ID"] == user_id]

    # If no rows match, that user_id does not exist in the CSV.
    if target_rows.empty:
        raise ValueError(f"User_ID '{user_id}' not found in CSV.")

    # target is the current user's single row (first match).
    target = target_rows.iloc[0]

    # 2) Extract the "tastes" we want to match on.
    target_genre = target["Favorite_Genre"]
    target_rating = target["Rating"]

    # 3) Build the candidate list:
    #    - same genre as the current user
    #    - not the current user (exclude self)
    candidates = df[
        (df["Favorite_Genre"] == target_genre) &
        (df["User_ID"] != user_id)
    ].copy()

    # If nobody shares the same genre, return empty suggestions.
    if candidates.empty:
        return target, candidates

    # 4) Compute a similarity measure:
    # rating_diff = how far away someone’s rating is from the current user’s rating.
    # Example: current rating 4
    # - candidate rating 5 => diff 1
    # - candidate rating 4 => diff 0 (best)
    candidates["rating_diff"] = (candidates["Rating"] - target_rating).abs()

    # 5) Sort candidates:
    # - smallest rating_diff first (closest rating)
    # - then higher rating (if same diff, prefer higher-rated users)
    candidates = candidates.sort_values(
        by=["rating_diff", "Rating"],
        ascending=[True, False]
    )

    # Return only the top N matches.
    return target, candidates.head(top_n)


# ----------------------------
# PROGRAM ENTRY POINT
# ----------------------------
def main():
    # Load the CSV table.
    try:
        df = load_data()
    except Exception as e:
        # If load_data fails, print the error and stop.
        print(f"❌ {e}")
        return

    print(f"Loaded {len(df)} rows.\n")

    # Ask the user running the script for the current user's ID.
    # This is the only thing you input; everything else is pulled from the CSV.
    user_id = input("Enter current User_ID (example: 1000): ").strip()

    # Simple check: user must type something.
    if not user_id:
        print("❌ User_ID cannot be empty.")
        return

    # Run the recommender logic.
    try:
        target, suggestions = suggest_users_by_genre_and_rating(df, user_id, TOP_N)
    except Exception as e:
        print(f"❌ {e}")
        return

    # Show the current user's row (so you can verify it matched the right person).
    print("\nCurrent user (pulled from CSV):")
    print(
        f"User_ID {target['User_ID']} | Age {target['Age']} | {target['Gender']} | "
        f"Genre {target['Favorite_Genre']} | Ending {target['Preferred_Ending']} | "
        f"Rating {target['Rating']}"
    )

    # Print suggestions.
    print(f"\nSuggested users (same genre, closest rating), TOP {TOP_N}:")

    if suggestions.empty:
        print("(No matches found.)")
        return

    # Print each suggested user row.
    for _, u in suggestions.iterrows():
        print(
            f"- User_ID {u['User_ID']} | Rating {u['Rating']} (diff {u['rating_diff']}) | "
            f"Age {u['Age']} | Ending {u['Preferred_Ending']} | {u['Gender']}"
        )

    # Save suggestions to a new CSV file so you can use them elsewhere.
    out_name = f"suggested_for_{user_id}.csv"
    out_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), out_name)

    # Save only the useful columns.
    suggestions.to_csv(
        out_path,
        index=False,
        columns=[
            "User_ID", "Age", "Gender", "Favorite_Genre",
            "Preferred_Ending", "Rating", "rating_diff"
        ],
    )

    print(f"\n✅ Saved suggestions to: {out_name}")


# This means:
# "Only run main() if this file is being run directly."
# If another Python file imports this file, main() will NOT auto-run.
if __name__ == "__main__":
    main()
