import tomllib
from itertools import groupby
from dataclasses import asdict
import argparse
import json
import os
import pty
from dataclasses import dataclass


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


def default_name_formatting(filename: str) -> str:
    parts = os.path.basename(filename).removesuffix(".py").split("_")
    parts = [p.capitalize() for p in parts]
    return " ".join(parts)


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
            VersionResult(f"{grouped[0].version} - {grouped[-1].version}", key)
        )
    result
    return result


def sort_inputs(inputs: list[str], metadata: dict) -> list[str]:
    mentioned_files = [o["name"] for o in metadata["file"]]
    unmentioned_files = [i for i in inputs if i not in mentioned_files]

    bad_files = [f for f in mentioned_files if f not in inputs]
    if bad_files != []:
        print(
            f"🔥 The following files were mentioned in metadata.toml but don't exist: {bad_files}"
        )
        exit(1)

    return mentioned_files + sorted(unmentioned_files)


@dataclass
class VersionResult:
    version: str
    diagnostic: str


@dataclass
class FileResult:
    name: str
    title: str
    description: str | None
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
        default="3.14",
        help="A comma seperated list of python versions to run against",
    )
    args = parser.parse_args()

    if args.versions == "all":
        versions = [f"3.{i}" for i in range(0, 14 + 1)] + ["3.15a3"]
    else:
        versions = args.versions.replace(" ", "").split(",")

    results: list[FileResult] = []
    with open("examples/metadata.toml", "rb") as f:
        metadata = tomllib.load(f)

    inputs = ["examples/" + f for f in sort_inputs(os.listdir("examples"), metadata)]
    for file in inputs:
        if not file.endswith(".py"):
            continue

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
        simple_name = file.removeprefix("examples/")
        infos = [i for i in metadata["file"] if i["name"] == simple_name]
        info = infos[0] if infos != [] else None
        title = default_name_formatting(simple_name)
        description = None
        if info:
            title = info.get("title", title)
            description = info.get("description")
        results.append(FileResult(file, title, description, code, version_results))

    with open("errors.json", "w") as f:
        json.dump([asdict(r) for r in results], f, indent=2)


if __name__ == "__main__":
    main()
