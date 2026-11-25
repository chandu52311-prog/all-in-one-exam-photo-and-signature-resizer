#!/usr/bin/env python3
import argparse
import subprocess
import sys
from pathlib import Path

REPO_DIR = Path(r"D:\all-in-one-exam-photo-and-signature-resizer")


def run_git(args: list) -> int:
    cmd = ["git", "-C", str(REPO_DIR)] + args
    print(f"[CMD] {' '.join(cmd)}")
    return subprocess.run(cmd, text=True).returncode


def main():
    parser = argparse.ArgumentParser(description="Direct Git helper for D:\\all-in-one-exam-photo-and-signature-resizer")
    parser.add_argument("action", choices=["status", "pull", "push"])
    parser.add_argument("--message", default="Update EXAMRESIZER.ME mock test & portal files")
    args = parser.parse_args()

    if not REPO_DIR.exists():
        print(f"[ERROR] Folder not found: {REPO_DIR}")
        sys.exit(1)

    if not (REPO_DIR / ".git").exists():
        print(f"[ERROR] Not a git repository: {REPO_DIR}")
        sys.exit(1)

    if args.action == "status":
        sys.exit(run_git(["status", "-s"]))

    if args.action == "pull":
        sys.exit(run_git(["pull", "--rebase"]))

    if args.action == "push":
        rc = run_git(["status", "-s"])
        if rc != 0:
            sys.exit(rc)
        rc = run_git(["add", "-A"])
        if rc != 0:
            sys.exit(rc)
        c_rc = run_git(["commit", "-m", args.message])
        if c_rc != 0:
            print("[INFO] No new changes to commit.")
        sys.exit(run_git(["push"]))


if __name__ == "__main__":
    main()
