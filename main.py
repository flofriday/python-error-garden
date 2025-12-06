from dataclasses import asdict
import argparse
import json
import os
import pty
from pydantic.dataclasses import dataclass


def create_diagnostic(version: str, code_path: str) -> str:
    output = bytes()

    def read(fd):
        nonlocal output
        data = os.read(fd, 1024)
        output += data
        return data

    def write(fd):
        return ""

    x = pty.spawn(["python" + version, code_path], read, write)

    return output.decode()


@dataclass
class VersionResult:
    version: str
    diagnostic: str


@dataclass
class FileResult:
    name: str
    code: str
    version_results: list[VersionResult]


def main():
    parser = argparse.ArgumentParser(
        prog="Generate the diagnostics data in errors.json",
        description="Run the inputs files against the provided python versions",
    )
    parser.add_argument(
        "-v",
        "--versions",
        default="3.14, 3.13, 3.12, 3.11, 3.10",
        help="A comma seperated list of python versions to run against",
    )
    parser.add_argument(
        "files",
        default=["mistakes"],
        nargs="*",
        help="A file or folder with examples to run against",
    )
    args = parser.parse_args()

    versions = args.versions.replace(" ", "").split(",")

    results: list[FileResult] = []

    for file in args.files:
        print(f"Processing '{file}'...")
        version_results = []
        for version in versions:
            diagnostic = create_diagnostic(version, file)
            version_results.append(
                {
                    "version": version,
                    "diagnostic": diagnostic,
                }
            )

        with open(file) as f:
            code = f.read()

        results.append(FileResult(file, code, version_results))

    with open("errors.json", "w") as f:
        json.dump([asdict(r) for r in results], f, indent=2)


if __name__ == "__main__":
    main()
