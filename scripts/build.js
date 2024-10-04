const path = require('node:path');
const fs = require('node:fs');
const cp = require('node:child_process');

console.log(__dirname)

// constants
const distDirPath = path.join(__dirname, '../dist/js');
const sourceDirPath = path.join(__dirname, '../proto');

// force remove dist dir
fs.rmSync(distDirPath, { recursive: true, force: true });

// make dist dir
fs.mkdirSync(distDirPath, { recursive: true });

// list proto files
const listProtoFilesResult = cp
  .spawnSync(
    'find',
    [
      sourceDirPath,
      '-iname',
      '*.proto',
    ],
  );

if(listProtoFilesResult.status !== 0) {
  process.stderr.write(listProtoFilesResult.stderr);
  process.exit(listProtoFilesResult.status);
}

const sourceFIlePathList = listProtoFilesResult
  .stdout
  .toString()
  .trim()
  .split('\n');


// find protoc-gen-ts path
const findProtocGenTsPathResult = cp
  .spawnSync(
    'npx',
    [
      'which',
      'protoc-gen-ts',
    ],
  );

if(findProtocGenTsPathResult.status !== 0) {
  process.stderr.write(findProtocGenTsPathResult.stderr);
  process.exit(findProtocGenTsPathResult.status);
}

const protocGenTsExecPath = findProtocGenTsPathResult
  .stdout
  .toString()
  .trim();

console.log(`[proto-gen-ts exec path] ${protocGenTsExecPath}`);

// build
const buildResult = cp
  .spawnSync(
    'npx',
    [
      'grpc_tools_node_protoc',
      '-I',
      sourceDirPath,
      `--plugin=protoc-gen-ts=${protocGenTsExecPath}`,
      `--js_out=import_style=commonjs,binary:${distDirPath}`,
      `--grpc_out=grpc_js:${distDirPath}`,
      `--ts_out=service=grpc-node,mode=grpc-js:${distDirPath}`,
      sourceFIlePathList.join(' '),
    ],
  );

if(buildResult.status !== 0) {
  process.stderr.write(buildResult.stderr);
  process.exit(buildResult.status);
}

// exit
process.exit(0);
