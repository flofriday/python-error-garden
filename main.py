from itertools import groupby
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


def compress_versions(versions: list[VersionResult]) -> list[VersionResult]:
    """Compress multiple Version Results

    It's quite common that multiple versions return the same output so to
    not clutter the UI we compress them.
    """
    result = []
    for key, grouped in groupby(versions, lambda v: v.diagnostic):
        grouped = list(grouped)
        if len(grouped) == 1:
            result += grouped
            continue

        result.append(
            VersionResult(f"{grouped[-1].version} - {grouped[0].version}", key)
        )
    result.reverse()
    return result


def walk_directories(files: list[str]) -> list[str]:
    result = []
    for file in files:
        if os.path.isfile(file):
            result.append(file)
            continue

        for rec_root, dirs, rec_files in os.walk(file, topdown=False):
            for name in rec_files:
                result.append(os.path.join(rec_root, name))

    return result


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
        default=["examples"],
        nargs="*",
        help="A file or folder with examples to run against",
    )
    args = parser.parse_args()

    versions = args.versions.replace(" ", "").split(",")

    results: list[FileResult] = []

    inputs = walk_directories(args.files)
    for file in inputs:
        print(f"Processing '{file}'...")
        version_results = []
        for version in versions:
            diagnostic = create_diagnostic(version, file)
            version_results.append(
                VersionResult(
                    version=version,
                    diagnostic=diagnostic,
                )
            )

        with open(file) as f:
            code = f.read()

        version_results = compress_versions(version_results)
        results.append(FileResult(file, code, version_results))

    with open("errors.json", "w") as f:
        json.dump([asdict(r) for r in results], f, indent=2)


if __name__ == "__main__":
    main()
