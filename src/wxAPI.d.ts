type WXCommonCallback = (res: any) => void;
type WXMergedAPI = WXNetAPI & WXMediaAPI & WXStorageAPI & WXLocationAPI & WXDeviceAPI & WXUIAPI & WXOpenAPI;

interface WXCommonObj {
	/**
	 * 接口调用失败的回调函数
	 * 
	 * @type {WXCommonCallback}
	 * @memberof WXCommonObj
	 */
	fail?: WXCommonCallback;
	/**
	 * 接口调用结束的回调函数（调用成功、失败都会执行）
	 * 
	 * @type {WXCommonCallback}
	 * @memberof WXCommonObj
	 */
	complete?: WXCommonCallback;
}

/**
 * 基础库 1.4.0 开始支持，低版本需做兼容处理
 * 
 * @interface WXNetAPIUploadFileProgressUpdateObj
 */
interface WXNetAPIUploadFileProgressUpdateObj {
	/**
	 * 上传进度百分比
	 * 
	 * @type {number}
	 * @memberof WXNetAPIUploadFileProgressUpdateObj
	 */
	progress: number;
	/**
	 * 已经上传的数据长度，单位 Bytes
	 * 
	 * @type {number}
	 * @memberof WXNetAPIUploadFileProgressUpdateObj
	 */
	totalBytesSent: number;
	/**
	 * 预期需要上传的数据总长度，单位 Bytes
	 * 
	 * @type {number}
	 * @memberof WXNetAPIUploadFileProgressUpdateObj
	 */
	totalBytesExpectedToSend: number;
}

/**
 * 基础库 1.4.0 开始支持，低版本需做兼容处理
 * 
 * @interface WXNetAPIDownloadFileProgressUpdateObj
 */
interface WXNetAPIDownloadFileProgressUpdateObj {
	/**
	 * 下载进度百分比
	 * 
	 * @type {number}
	 * @memberof WXNetAPIDownloadFileProgressUpdateObj
	 */
	progress: number;
	/**
	 * 已经下载的数据长度，单位 Bytes
	 * 
	 * @type {number}
	 * @memberof WXNetAPIDownloadFileProgressUpdateObj
	 */
	totalBytesWritten: number;
	/**
	 * 预期需要下载的数据总长度，单位 Bytes
	 * 
	 * @type {number}
	 * @memberof WXNetAPIDownloadFileProgressUpdateObj
	 */
	totalBytesExpectedToWrite: number;
}

/**
 * 基础库 1.4.0 开始支持，低版本需做兼容处理
 * 
 * @interface WXRequestTask
 */
interface WXNetAPIRequestTask {
	/**
	 * 中断请求任务
	 * 
	 * @memberof WXRequestTask
	 */
	abort(): void;
}

interface WXNetAPIUploadFileTask {
	//onProgressUpdate(res: WXNetAPIUploadProgressUpdateObj): void;
    onProgressUpdate(res: any): void;
	abort(): void;
}
interface WXNetAPIDownloadFileTask {
    //onProgressUpdate(res: WXNetAPIUploadProgressUpdateObj): void;
    onProgressUpdate(res: any): void;
	abort(): void;
}
interface WXNetAPICommonSuccessObj {
	/**
	 * 开发者服务器返回的数据
	 * 
	 * @type {(Object | string)}
	 * @memberof WXNetAPIRequestSuccess
	 */
	data: Object | string;
	/**
	 * 开发者服务器返回的 HTTP 状态码
	 * 
	 * @type {number}
	 * @memberof WXNetAPIRequestSuccess
	 */
	statusCode: number;
}
interface WXNetAPIRequestSuccessObj extends WXNetAPICommonSuccessObj {
	/**
	 * 开发者服务器返回的 HTTP Response Header, 最低版本1.2.0
	 * 
	 * @type {Object}
	 * @memberof WXNetAPIRequestSuccess
	 */
	header: Object;
}
interface WXNetAPIRequestObj extends WXCommonObj {
	/**
	 * 开发者服务器接口地址
	 * 
	 * @type {string}
	 * @memberof WXNetAPIRequestObj
	 */
	url: string;
	/**
	 * 请求的参数
	 * 
	 * @type {(Object|string)}
	 * @memberof WXNetAPIRequestObj
	 */
	data?: Object | string;
	/**
	 * 设置请求的 header，header 中不能设置 Referer。
	 * 
	 * @type {Object}
	 * @memberof WXNetAPIRequestObj
	 */
	header?: Object;
	/**
	 * 默认GET，（需大写）有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
	 * 
	 * @type {string}
	 * @memberof WXNetAPIRequestObj
	 */
	method?: string;
	/**
	 * 默认json，如果设为json，会尝试对返回的数据做一次 JSON.parse
	 * 
	 * @type {string}
	 * @memberof WXNetAPIRequestObj
	 */
	dataType?: string;
	success: (res: WXNetAPIRequestSuccessObj) => void;
}

interface WXNetAPIDownloadFileObj extends WXCommonObj {
	/**
	 * 下载资源的 url
	 * 
	 * @type {string}
	 * @memberof WXNetAPIDownloadFileObj
	 */
	url: string;
	/**
	 * HTTP 请求 Header，header 中不能设置 Referer
	 * 
	 * @type {Object}
	 * @memberof WXNetAPIDownloadFileObj
	 */
	header?: Object;
	/**
	 * 下载成功后以 tempFilePath 的形式传给页面，res = {tempFilePath: '文件的临时路径'}
	 * 注：文件的临时路径，在小程序本次启动期间可以正常使用，如需持久保存，需在主动调用 wx.saveFile，才能在小程序下次启动时访问得到。
	 * @memberof WXNetAPIDownloadFileObj
	 */
	success?: (res: { tempFilePath: string, [propName: string]: any }) => void;
}

interface WXNetAPIUploadFileObj extends WXCommonObj {
	/**
	 * 开发者服务器 url
	 * 
	 * @type {string}
	 * @memberof WXNetAPIUploadFileObj
	 */
	url: string;
	/**
	 * 要上传文件资源的路径
	 * 
	 * @type {string}
	 * @memberof WXNetAPIUploadFileObj
	 */
	filePath: string;
	/**
	 * 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
	 * 
	 * @type {string}
	 * @memberof WXNetAPIUploadFileObj
	 */
	name: string;
	/**
	 * HTTP 请求 Header, header 中不能设置 Referer
	 * 
	 * @type {Object}
	 * @memberof WXNetAPIUploadFileObj
	 */
	header?: Object;
	/**
	 * HTTP 请求中其他额外的 form data
	 * 
	 * @type {Object}
	 * @memberof WXNetAPIUploadFileObj
	 */
	formData?: Object;
	success: (res: WXNetAPICommonSuccessObj) => void;
}

interface WXNetAPIConnectSocketObj extends WXCommonObj {
	url: string;
	data?: Object;
	header?: Object;
	method?: string;
}

interface WXNetAPI {
	request(obj: WXNetAPIRequestObj): WXNetAPIRequestTask;
	downloadFile(obj: WXNetAPIDownloadFileObj): WXNetAPIDownloadFileTask;
	uploadFile(obj: WXNetAPIUploadFileObj): WXNetAPIUploadFileTask;

	connectSocket(obj: WXNetAPIConnectSocketObj);
	onSocketOpen(cb: WXCommonCallback);
	onSocketError(cb: WXCommonCallback);
	sendSocketMessage(obj: { data: string | ArrayBuffer } & WXCommonObj);
	onSocketMessage(callback: (data: string | ArrayBuffer) => void);
	closeSocket();
	onSocketClose(cb: WXCommonCallback);
}

interface WXChooseImageObj {
	count?: number;
	sizeType?: string[];
	sourceType?: string[];
	success: (res: { tempFilePaths: string[], [propName: string]: any }) => void;
	fail?: WXCommonCallback;
	complete?: WXCommonCallback;
}

interface WXPreviewImageObj extends WXCommonObj {
	current?: string;
	urls: string[];
}

interface WXGetImageObj {
	src: string;
	success?: (res: { width: number, height: number, [propName: string]: any }) => void;
	fail?: WXCommonCallback;
	complete?: WXCommonCallback;
}

interface WXStartRecordObj {
	success?: (res: { tempFilePath: string, [propName: string]: any }) => void;
	fail?: WXCommonCallback;
	complete?: WXCommonCallback;
}

interface WXGetBackgroundAudioPlayerStateObj {
	success?: (res: { duration: number, currentPostion: number, status: number, downloadPercent: number, dataUrl: string, [propName: string]: any }) => void;
	fail?: WXCommonCallback;
	complete?: WXCommonCallback;
}

interface WXSaveFileObj {
	tempFilePath: string,
	success?: (res: { savedFilePath: string, [propName: string]: any }) => void;
	fail?: WXCommonCallback;
	complete?: WXCommonCallback;
}

interface WXGetSaveFileObj {
	success?: (res: { errMsg: string, fileList: { filePath: string, createTime: number, size: number, [propName: string]: any }[] }) => void;
	fail?: WXCommonCallback;
	complete?: WXCommonCallback;
}

interface WXGetSaveFileInfoObj {
	filePath: string;
	success?: (res: { errMsg: string, createTime: number, size: number, [propName: string]: any }) => void;
	fail?: WXCommonCallback;
	complete?: WXCommonCallback;
}

interface WXRemoveSavedFileObj {
	filePath: string;
	success?: (res: { errMsg: string, fileList: { filePath: string, createTime: number, size: number, [propName: string]: any }[] }) => void;
	fail?: WXCommonCallback;
	complete?: WXCommonCallback;
}

interface WXChooseVideoObj extends WXCommonObj {
	sourceType?: string[];
	maxDuration?: number;
	camera?: string[];
}

interface WXVideo {
	tempFilePath: string;
	duration: number;
	size: number;
	height: number;
	width: number;
}

interface WXAudioContext {
	play();
	pause();
	seek(position: number);
}

interface WXVideoContext {
	play();
	pause();
	seek(position: number);
	sendDanmu(danmu: { text: string, color: string })
}

interface WXMediaAPI {
	chooseImage(obj: WXChooseImageObj);
	previewImage(obj: WXPreviewImageObj);
	getImageInfo(obj: WXGetImageObj);

	startRecord(obj: WXStartRecordObj);
	stopRecord();

	playVoice(obj: { filePath: string } & WXCommonObj);
	pauseVoice();
	stopVoice();

	getBackgroundAudioPlayerState(obj: WXGetBackgroundAudioPlayerStateObj);
	playBackgroundAudio(obj: { dataUrl: string, title?: string, coverImgUrl?: string } & WXCommonObj);
	pauseBackgroundAudio();
	seekBackgroundAudio(obj: { position: number } & WXCommonObj);
	stopBackgroundAudio();
	onBackgroundAudioPlay(cb: WXCommonCallback);
	onBackgroundAudioPause(cb: WXCommonCallback);
	onBackgroundAudioStop(cb: WXCommonCallback);

	saveFile(obj: WXSaveFileObj);
	getSavedFileList(obj: WXGetSaveFileObj);
	getSavedFileInfo(obj: WXGetSaveFileInfoObj);
	removeSavedFile(obj: WXRemoveSavedFileObj);
	openDocument(obj: { filePath: string } & WXCommonObj);

	chooseVideo(obj: WXChooseVideoObj): WXVideo;
	createAudioContext(audioId: string): WXAudioContext;
	createVideoContext(vedioId: string): WXVideoContext;
}

interface WXGetStorageObj {
	key: string;
	success: (res: { data: any, [propName: string]: any }) => void;
	fail?: WXCommonCallback;
	complete?: WXCommonCallback;
}

interface WXGetStorageInfoObj {
	success: (res: { keys: string[], currentSize: number, limitSize: number, [propName: string]: any }) => void;
	fail?: WXCommonCallback;
	complete?: WXCommonCallback;
}

interface WXStorageAPI {
	setStorage(obj: { key: string, data: Object | string } & WXCommonObj);
	setStorageSync(key: string, data: Object | string);
	getStorage(obj: WXGetStorageObj);
	getStorageSync(key: string): any;
	getStorageInfo(obj: WXGetStorageInfoObj);
	getStorageInfoSync(): { keys: string[], currentSize: number, limitSize: number };
	removeStorage(obj: WXGetStorageObj);
	removeStorageSync(key: string);
	clearStorage();
	clearStorageSync();
}

interface WXGetLocationObj {
	type: string;
	success: (res: { latitude: number, longitude: number, speed: number, accuracy: number, [propName: string]: any }) => void;
	cancel?: WXCommonCallback;
	fail?: WXCommonCallback;
	complete?: WXCommonCallback;
}

interface WXChooseLocationObj {
	success: (res: { latitude: number, longitude: number, name: string, address: string, [propName: string]: any }) => void;
	fail?: WXCommonCallback;
	complete?: WXCommonCallback;
}

interface WXOpenLocationObj extends WXCommonObj {
	latitude: number;
	longitude: number;
	scale?: number;
	name?: string;
	address?: string;
}

interface WXLocationAPI {
	getLocation(obj: WXGetLocationObj);
	chooseLocation(obj: WXGetLocationObj);
	openLocation(obj: WXOpenLocationObj);
}

interface WXSystemInfo {
	model: string;
	pixelRatio: number;
	windowWidth: number;
	windowHeight: number;
	language: string;
	version: string;
	[propName: string]: any
}

interface WXDeviceAPI {
	getNetworkType(obj: { success: (res: { networkType: string, [propName: string]: any }) => void, fail?: WXCommonCallback, complete?: WXCommonCallback });
	getSystemInfo(obj: { success: (res: WXSystemInfo) => void, fail?: WXCommonCallback, complete?: WXCommonCallback });
	getSystemInfoSync(): WXSystemInfo;
	onAccelerometerChange(cb: (res: { x: number, y: number, z: number, [propName: string]: any }) => void);
	onCompassChange(cb: (res: { direction: number, [propName: string]: any }) => void);
	makePhoneCall(obj: { phoneNumber: string } & WXCommonObj);
}

interface WXToast extends WXCommonObj {
	title: string;
	icon?: string;
	duration?: number;
}

interface WXModal {
	title: string;
	content: string;
	showCancel?: boolean;
	cancelText?: string;
	cancelColor?: string;
	confirmText?: string;
	confirmColor?: string;
	success?: (res: { confirm: number, [propName: string]: any }) => void;
	fail?: WXCommonCallback;
	complete?: WXCommonCallback;
}

interface WXActionSheet {
	itemList: string[];
	itemColor?: string;
	success?: (res: { tabIndex: number, cancel: boolean, [propName: string]: any }) => void;
	fail?: WXCommonCallback;
	complete?: WXCommonCallback;
}

interface WXCreateAnimationObj {
	duration?: number;
	timingFunction?: string;
	delay?: number;
	transformOrigin?: string;
}

interface WXAnimation {
	opacity(value: number): WXAnimation;
	backgroundColor(color: string): WXAnimation;
	width(length: number): WXAnimation;
	height(length: number): WXAnimation;
	top(length: number): WXAnimation;
	left(length: number): WXAnimation;
	bottom(length: number): WXAnimation;
	right(length: number): WXAnimation;

	rotate(deg: number): WXAnimation;
	rotateX(deg: number): WXAnimation;
	rotateY(deg: number): WXAnimation;
	rotateZ(deg: number): WXAnimation;
	rotate3d(deg: number, x: number, y: number, z: number): WXAnimation;

	scale(sx: number, sy?: number): WXAnimation;
	scaleX(sx: number): WXAnimation;
	scaleY(sy: number): WXAnimation;
	scaleZ(sz: number): WXAnimation;
	scale3d(sx: number, sy: number, sz: number): WXAnimation;

	translate(tx: number, ty?: number): WXAnimation;
	translateX(tx: number): WXAnimation;
	translateY(ty: number): WXAnimation;
	translateZ(tz: number): WXAnimation;
	translate3d(tx: number, ty: number, tz: number): WXAnimation;
	skew(ax: number, ay?: number): WXAnimation;
	skewX(ax: number): WXAnimation;
	skewY(ay: number): WXAnimation;

	matrix(a: number, b: number, c: number, d: number, tx: number, ty: number): WXAnimation;
	matrix3d(a1: number, b1: number, c1: number, d1: number, a2: number, b2: number, c2: number, d2: number, a3: number, b3: number, c3: number, d3: number, a4: number, b4: number, c4: number, d4: number): WXAnimation;

	step();
}

interface WXContext {
	getActions(): any;
	clearActions();

	scale(scaleWidth: number, scaleHeight: number);
	rotate(degree: number);
	translate(x: number, y: number);
	save();
	restore();

	clearRect(x: number, y: number, width: number, height: number);
	fillText(x: number, y: number, text: string);
	drawImage(imageResource: string, x: number, y: number, width: number, height: number);
	fill();
	stroke();

	beginPath();
	closePath();
	moveTo(x: number, y: number);
	lineTo(x: number, y: number);
	rect(x: number, y: number, width: number, height: number);
	arc(x: number, y: number, radius: number, startAngle: number, sweepAngle: number);
	quadraticCurveTo(cpx: number, cpy: number, x: number, y: number);
	bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number);

	setFillStyle(color: string);
	setStrokeStyle(color: string);
	setGlobalAlpha(alpha: number);
	setShadow(offsetX: number, offsetY: number, blur: number, color: string);
	setFontSize(fontSize: number);
	setLineWidth(lineWidth: number);
	setLineCap(lineCap: string);
	setLineJoin(lineJoin: string);
	setMiterLimit(miterLimit: number);
}

interface WXUIAPI {
	showToast(obj: WXToast);
	showLoading(obj: WXToast);
	hideToast();
	hideLoading();
	showModal(obj: WXModal);
	showActionSheet(obj: WXActionSheet);

	setNavigationBarTitle(obj: { title: string } & WXCommonObj);
	showNavigationBarLoading();
	hideNavigationBarLoading();

	navigateTo(obj: { url: string } & WXCommonObj);
	redirectTo(obj: { url: string } & WXCommonObj);
	navigateBack(obj: { delta: number });
	switchTab(obj: { url: string } & WXCommonObj);

	createAnimation(obj: WXCreateAnimationObj): WXAnimation;

	createContext(): WXContext;
	drawCanvas(obj: { canvasId: string, actions: any[], reserve?: boolean });
	canvasToTempFilePath(obj: { canvasId: string });

	hideKeyboard();
	stopPullDownRefresh();
	createCanvasContext(any);
}

interface WXPayment extends WXCommonObj {
	timeStamp: number;
	nonceStr: string;
	package: string;
	signType: string;
	paySign: string;
}

interface WXOpenAPI {
	login(obj: { success?: (res: { errMsg: string, code: string, [propName: string]: any }) => void, fail?: WXCommonCallback, complete?: WXCommonCallback });
	checkSession(obj: WXCommonObj);

	getUserInfo(obj: { success?: (res: { userInfo: Object, rawData: string, signature: string, encryptedData: string, iv: string, [propName: string]: any }) => void, fail?: WXCommonCallback, complete?: WXCommonCallback });

	requestPayment(obj: WXPayment);
}

interface WXPageObj {
	data?: Object;
	onLoad?: Function;
	onReady?: Function;
	onShow?: Function;
	onHide?: Function;
	onUnload?: Function;
	onPullDownRefresh?: Function;
	onReachBottom?: Function;
	[propName: string]: any;
}

interface WXAppObj {
	onLaunch?: Function;
	onShow?: Function;
	onHide?: Function;
	[propName: string]: any;
}

interface IPage {
	(obj: WXPageObj): void;
	setData(obj: Object);
	forceUpdate();
	update();
}

interface IApp {
	(obj: WXAppObj): void;
	globalData: any;
}

// 微信的文档太弱了，这块儿没有说明
interface WXGetAppObj {
	globalData: any;
	[propName: string]: any;
	getUserInfo(cb: (userInfo: Object) => void);
	getCurrentPage(): IPage;
}

declare let wx: WXMergedAPI;
declare let Page: IPage;
declare let App: IApp;
declare function getApp(): WXGetAppObj;
declare function getCurrentPages(): any[];

declare module "WXAPI" {
	export let wx: WXMergedAPI;
	export let Page: IPage;
	export function App(obj: WXAppObj);
	export function getApp(): WXGetAppObj;
	export function getCurrentPages(): any[];
}
