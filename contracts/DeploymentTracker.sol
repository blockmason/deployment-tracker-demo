pragma solidity 0.5.8;


contract DeploymentStatus {
    mapping (uint256 => string) private appLabel;
    mapping (uint256 => string) private environmentLabel;
    mapping (uint256 => mapping (uint256 => uint256)) private pendingNodeCount;
    mapping (uint256 => mapping (uint256 => uint256)) private totalNodeCount;
    mapping (uint256 => mapping (uint256 => string)) private pendingVersion;
    mapping (uint256 => mapping (uint256 => string)) private liveVersion;

    function startDeployment(uint256 app, uint256 environment, string memory version) public {
        string memory pending = pendingVersion[app][environment];
        string memory live = liveVersion[app][environment];

        if (keccak256(abi.encodePacked(pending)) != keccak256(abi.encodePacked(live))) {
            require(keccak256(abi.encodePacked(version)) == keccak256(abi.encodePacked(pending)));
        }

        pendingVersion[app][environment] = version;
        pendingNodeCount[app][environment] += 1;
        totalNodeCount[app][environment] += 1;
    }

    function stopDeployment(uint256 app, uint256 environment) public {
        require(pendingNodeCount[app][environment] > 0);

        pendingNodeCount[app][environment] -= 1;

        if (pendingNodeCount[app][environment] == 0) {
            totalNodeCount[app][environment] = 0;
            liveVersion[app][environment] = pendingVersion[app][environment];
        }
    }

    function getAppLabel(uint256 id) public view returns (string memory app) {
        return appLabel[id];
    }

    function setAppLabel(uint256 id, string memory label) public {
        appLabel[id] = label;
    }

    function getEnvironmentLabel(uint256 id) public view returns (string memory environment) {
        return environmentLabel[id];
    }

    function setEnvironmentLabel(uint256 id, string memory label) public {
        environmentLabel[id] = label;
    }

    function getVersion(uint256 app, uint256 environment) public view returns (string memory version) {
        return liveVersion[app][environment];
    }

    function getPendingVersion(uint256 app, uint256 environment) public view returns (string memory version, uint256 progress, uint256 total) {
        uint256 pending = pendingNodeCount[app][environment];
        total = totalNodeCount[app][environment];
        progress = total - pending;
        version = progress == total ? liveVersion[app][environment] : pendingVersion[app][environment];
        return (version, progress, total);
    }
}
