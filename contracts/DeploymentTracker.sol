pragma solidity 0.5.8;


contract DeploymentTracker {
  struct Deployment {
    uint256 id;
    address reporter;
    string app;
    string version;
    string environment;
    string target;
    uint256 startedAt;
    uint256 endedAt;
    uint8 status;
    string message;
  }

  uint8 constant STATUS_UNKNOWN = 0x0;
  uint8 constant STATUS_PENDING = 0x1;
  uint8 constant STATUS_FAILED = 0x2;
  uint8 constant STATUS_SUCCESS = 0x3;

  mapping (uint256 => Deployment) public deployments;

  event DeploymentStart(uint256 id, address reporter, string indexed app, string version, string indexed environment, string indexed target, uint256 startedAt);
  event DeploymentComplete(uint256 id, uint256 endedAt, string message);
  event DeploymentFail(uint256 id, uint256 endedAt, string message);
  event DeploymentSuccess(uint256 id, uint256 endedAt, string message);

  function isPending(uint256 id) public view returns (bool result) {
    return deployments[id].status == STATUS_PENDING;
  }

  function isFailed(uint256 id) public view returns (bool result) {
    return deployments[id].status == STATUS_FAILED;
  }

  function isSuccess(uint256 id) public view returns (bool result) {
    return deployments[id].status == STATUS_SUCCESS;
  }

  function isComplete(uint256 id) public view returns (bool result) {
    return isFailed(id) || isSuccess(id);
  }

  function start(uint256 id, string memory app, string memory version, string memory environment, string memory target) public {
    require(deployments[id].status == STATUS_UNKNOWN);

    Deployment storage deployment = deployments[id];

    deployment.id = id;
    deployment.reporter = msg.sender;
    deployment.app = app;
    deployment.version = version;
    deployment.environment = environment;
    deployment.target = target;
    deployment.startedAt = block.timestamp;
    deployment.status = STATUS_PENDING;

    emit DeploymentStart(id, msg.sender, app, version, environment, target, block.timestamp);
  }

  function success(uint256 id, string memory message) public {
    complete(id, STATUS_SUCCESS, message);
    emit DeploymentSuccess(id, block.timestamp, message);
  }

  function fail(uint256 id, string memory message) public {
    complete(id, STATUS_FAILED, message);
    emit DeploymentFail(id, block.timestamp, message);
  }

  function complete(uint256 id, uint8 status, string memory message) internal {
    require(deployments[id].status == STATUS_PENDING);
    require(deployments[id].reporter == msg.sender);

    Deployment storage deployment = deployments[id];

    deployment.endedAt = block.timestamp;
    deployment.status = status;
    deployment.message = message;

    emit DeploymentComplete(id, block.timestamp, message);
  }
}
