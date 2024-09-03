# proto-boilerplate

## Usage

### (Recommended) import as git submodule

#### 1. Add proto repository to your app repository as git submodule

```bash
$ git submodule add {repository-url} {module-directory-path}
```

#### 2. Build proto file for your app

```bash
# e.g.) Python
$ protoc --proto_path={module-directory-path} --python_out={distribution-path} $(find {module-directory-path} -iname *.proto)
```

## Development Guide

### Requirements

- protoc
- make

### Directory Structure

```plain
proto/
├ namespaceXXX/
│  └ appXXX01/
│     ├ user/
│     │  └ user_profile.proto
│     └ hoge/
│        ├ hoge_service.proto
│        └ hoge_hoge_service.proto
└ namespaceYYY/
   └ appYYY01/
      └ some-domain-01/
         ├ some_domain_01_hoge_service.proto
         └ some_domain_01_fuga_service.proto
```

### Validation

```bash
$ make check
```
