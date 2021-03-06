import * as tslib_1 from "tslib";
import { FullFaceDescription } from '../classes/FullFaceDescription';
import { extractFaces } from '../dom';
import { ComposableTask } from './ComposableTask';
import { nets } from './nets';
var ComputeFaceDescriptorsTaskBase = /** @class */ (function (_super) {
    tslib_1.__extends(ComputeFaceDescriptorsTaskBase, _super);
    function ComputeFaceDescriptorsTaskBase(detectFaceLandmarksTask, input) {
        var _this = _super.call(this) || this;
        _this.detectFaceLandmarksTask = detectFaceLandmarksTask;
        _this.input = input;
        return _this;
    }
    return ComputeFaceDescriptorsTaskBase;
}(ComposableTask));
export { ComputeFaceDescriptorsTaskBase };
var ComputeAllFaceDescriptorsTask = /** @class */ (function (_super) {
    tslib_1.__extends(ComputeAllFaceDescriptorsTask, _super);
    function ComputeAllFaceDescriptorsTask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ComputeAllFaceDescriptorsTask.prototype.run = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            var facesWithLandmarks, alignedFaceCanvases;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.detectFaceLandmarksTask];
                    case 1:
                        facesWithLandmarks = _a.sent();
                        return [4 /*yield*/, extractFaces(this.input, facesWithLandmarks.map(function (_a) {
                                var landmarks = _a.landmarks;
                                return landmarks.align();
                            }))];
                    case 2:
                        alignedFaceCanvases = _a.sent();
                        return [4 /*yield*/, Promise.all(facesWithLandmarks.map(function (_a, i) {
                                var detection = _a.detection, landmarks = _a.landmarks;
                                return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                    var descriptor;
                                    return tslib_1.__generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0: return [4 /*yield*/, nets.faceRecognitionNet.computeFaceDescriptor(alignedFaceCanvases[i])];
                                            case 1:
                                                descriptor = _b.sent();
                                                return [2 /*return*/, new FullFaceDescription(detection, landmarks, descriptor)];
                                        }
                                    });
                                });
                            }))];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return ComputeAllFaceDescriptorsTask;
}(ComputeFaceDescriptorsTaskBase));
export { ComputeAllFaceDescriptorsTask };
var ComputeSingleFaceDescriptorTask = /** @class */ (function (_super) {
    tslib_1.__extends(ComputeSingleFaceDescriptorTask, _super);
    function ComputeSingleFaceDescriptorTask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ComputeSingleFaceDescriptorTask.prototype.run = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var detectionWithLandmarks, detection, landmarks, alignedRect, alignedFaceCanvas, descriptor;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.detectFaceLandmarksTask];
                    case 1:
                        detectionWithLandmarks = _a.sent();
                        if (!detectionWithLandmarks) {
                            return [2 /*return*/];
                        }
                        detection = detectionWithLandmarks.detection, landmarks = detectionWithLandmarks.landmarks, alignedRect = detectionWithLandmarks.alignedRect;
                        return [4 /*yield*/, extractFaces(this.input, [alignedRect])];
                    case 2:
                        alignedFaceCanvas = (_a.sent())[0];
                        return [4 /*yield*/, nets.faceRecognitionNet.computeFaceDescriptor(alignedFaceCanvas)];
                    case 3:
                        descriptor = _a.sent();
                        return [2 /*return*/, new FullFaceDescription(detection, landmarks, descriptor)];
                }
            });
        });
    };
    return ComputeSingleFaceDescriptorTask;
}(ComputeFaceDescriptorsTaskBase));
export { ComputeSingleFaceDescriptorTask };
//# sourceMappingURL=ComputeFaceDescriptorsTasks.js.map