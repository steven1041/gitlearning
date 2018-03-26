
class LotteryPage extends eui.Component {

    public bg: eui.Image;
    public topGroup: eui.Group;
    public btn_return: eui.Rect;
    public btn_set: eui.Rect;
    public scroller_lottery: eui.Scroller;
    public myG: eui.Group;
    public list_lottery: eui.List;
    public tabGroup: eui.Group;
    public tab0: eui.Group;
    public tab1: eui.Group;
    public tab2: eui.Group;
    public tab3: eui.Group;

    public lotteryArray: eui.ArrayCollection;

    constructor() {
        super();

        this.skinName = "skin.LotteryPage";
    }

    private arr = [];
    protected childrenCreated(): void {
        super.childrenCreated();
        //this.initScene();
        // this.list_lottery.useVirtualLayout = true;
        // this.scroller_lottery.viewport = this.list_lottery;

        //this.initList();
        this.scroller_lottery.bounces = false;
        egret.setTimeout(() => {
            for (var i = 0; i < 20; i++) {
                let obj = {};
                obj['no'] = this.count.toString();
                for (var j = 0; j < 8; j++) {
                    obj[`lottery${j}`] = Math.floor(Math.random() * 21 + 1);
                }
                obj['time'] = '2018-03-23';
                if (i % 2 == 0) {
                    obj['bg'] = "lottoryItem_bg0_png";
                } else {
                    obj['bg'] = "lottoryItem_bg1_png";
                }
                this.arr.push(obj);
                this.count++;
            }
            this.lotteryArray = new eui.ArrayCollection(this.arr);
            this.list_lottery.dataProvider = this.lotteryArray;
            this.list_lottery.itemRenderer = LotteryItem;
            this.scroller_lottery.addEventListener(eui.UIEvent.CHANGE_END, this.onChangeEnd, this);
            this.scroller_lottery.addEventListener(eui.UIEvent.CHANGE_START, this.onChangeStart, this);
            this.scroller_lottery.addEventListener(eui.UIEvent.CHANGE, this.onChange, this);
            console.log('create list start', egret.getTimer());

            // console.log('开始加', this.count, egret.getTimer())
            // this.addItemByTime(this.count, 200);
        }, this, 80);
        this.list_lottery.addEventListener(eui.UIEvent.CREATION_COMPLETE, () => {
            console.log('create list end', egret.getTimer());
        }, this);
    }
    private timer: egret.Timer;
    private addItemByTime(n: number, space: number) {
        this.timer = new egret.Timer(n, space);
        this.timer.start();
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onComplete, this);

    }

    private onTimer(e: egret.TimerEvent) {
        this.lotteryArray.addItem(this.arr.shift());
    }

    private onComplete(e: egret.TimerEvent) {
        this.timer.stop();
        console.log('加完了', this.count, egret.getTimer())
    }

    private initList() {
        this.count = 0;
        let arr = [];
        for (var i = 0; i < 20; i++) {
            let obj = {};
            obj['no'] = this.count.toString();
            for (var j = 0; j < 8; j++) {
                obj[`lottery${j}`] = Math.floor(Math.random() * 21 + 1);
            }
            obj['time'] = '2018-03-23';
            if (i % 2 == 0) {
                obj['bg'] = "lottoryItem_bg0_png";
            } else {
                obj['bg'] = "lottoryItem_bg1_png";
            }
            arr.push(obj);
            this.count++;
        }
        this.lotteryArray = new eui.ArrayCollection(arr);
        this.list_lottery.dataProvider = this.lotteryArray;
        this.list_lottery.itemRenderer = LotteryItem;

        egret.setTimeout(() => {
            //this.myG.cacheAsBitmap = true;
            console.log(this.list_lottery.numChildren, this.list_lottery.numElements);
        }, this, 1000)
        this.scroller_lottery.addEventListener(eui.UIEvent.CHANGE_END, this.onChangeEnd, this);
        this.scroller_lottery.addEventListener(eui.UIEvent.CHANGE_START, this.onChangeStart, this);
        this.scroller_lottery.addEventListener(eui.UIEvent.CHANGE, this.onChange, this);
    }

    private onChangeStart(e: eui.UIEvent) {
        console.log("滚动开始！");
    }

    private addN = 0;

    private async onChange(e: eui.UIEvent) {
        let scroller = e.currentTarget as eui.Scroller;
        let dis = scroller.viewport.scrollV;
        // console.log('滚动时间', dis, egret.getTimer());
        let disN = Math.floor(dis / 66);
        if (disN - this.addN > 0) {
            let obj = {};
            this.count++;
            this.addN++;
            obj['no'] = this.count.toString();
            for (var j = 0; j < 8; j++) {
                obj[`lottery${j}`] = Math.floor(Math.random() * 21 + 1);
            }
            obj['time'] = '2018-03-23';
            if (this.count % 2 == 0) {
                obj['bg'] = "lottoryItem_bg0_png";
            } else {
                obj['bg'] = "lottoryItem_bg1_png";
            }
            this.lotteryArray.addItem(obj);
            this.list_lottery.dataProvider = this.lotteryArray;
            this.list_lottery.itemRenderer = LotteryItem;
            // this.list_lottery.updateRenderer(new LotteryItem(), this.count, obj);
            //this.list_lottery.validateDisplayList();
        }

    }

    private async onChangeEnd(e: eui.UIEvent) {
        if ((this.scroller_lottery.viewport.scrollV + this.scroller_lottery.height) >= this.scroller_lottery.viewport.contentHeight) {
            console.log("滚动到底部了");

            // await this.addList();
            // await this.sleep(1000);
            // this.removeChild(this.wait);
            // this.list_lottery.validateNow();
            // this.list_lottery.validateDisplayList();
        }

    }

    private sleep(time) {
        return new Promise(resolve => {
            egret.setTimeout(() => {
                resolve();
            }, this, time);
        });
    }
    private wait: WaitPanel;
    private count: number = 0;
    private addList() {
        this.wait = new WaitPanel();
        this.addChild(this.wait);

        return new Promise(async resolve => {
            let arr = [];
            console.log('111', egret.getTimer());
            for (var i = 0; i < 18; i++) {
                let obj = {};
                obj['no'] = this.count.toString();
                for (var j = 0; j < 8; j++) {
                    obj[`lottery${j}`] = Math.floor(Math.random() * 21 + 1);
                }
                obj['time'] = '2018-03-23';
                if (i % 2 == 0) {
                    obj['bg'] = "lottoryItem_bg0_png";
                } else {
                    obj['bg'] = "lottoryItem_bg1_png";
                }
                arr.push(obj);
                this.count++;
                this.lotteryArray.addItem(obj);
                this.list_lottery.updateRenderer(new LotteryItem(), this.count, obj);
                this.list_lottery.invalidateDisplayList();
            }
            console.log('2222', egret.getTimer());

            resolve(arr);
        });

    }




    private initScene() {
        // this.initPageButton();
        // this.initConfig();

        let arr = [];
        for (var i = 0; i < 40; i++) {
            let obj = {};
            obj['no'] = i.toString();
            for (var j = 0; j < 8; j++) {
                obj[`lottery${j}`] = Math.floor(Math.random() * 21 + 1);
            }
            obj['time'] = '2018-03-23';
            if (i % 2 == 0) {
                obj['bg'] = "lottoryItem_bg0_png";
            } else {
                obj['bg'] = "lottoryItem_bg1_png";
            }
            arr.push(obj);
        }

        for (var i = 0; i < arr.length; i++) {
            let data = arr[i];
            let group = this.createItem(data);
            group.y = group.height * i;
            this.myG.addChild(group);

        }
        this.list_lottery.useVirtualLayout = true;
        egret.setTimeout(function () {
            //this.myG.cacheAsBitmap = true;
        }, this, 400);
    }

    private itemCofig = {
        width: 720,
        height: 66,
        noWidth: 115,
        noY: 18,
        firstBallX: 131,
        ballSpace: 12,
        bg0: "lottoryItem_bg0_png",
        bg1: "lottoryItem_bg1_png",
        timeX: 564,
        timeWidth: 156,
        redBall: "lotteryitem_redball_png",
        blueBall: "lotteryitem_blueball_png",
        lotteryY: 12,
        lotterySize: 30,
        lotteryFont: 'Microsoft YaHei'
    }

    private createItem(data: any) {
        let group = new eui.Group();
        // let group = new egret.Sprite();
        group.width = this.itemCofig.width;
        group.height = this.itemCofig.height;

        let bg = this.createBitmapByName(data.bg);
        // let bg = this.createBitmapByName2(data.bg);
        group.addChild(bg);

        let no = new eui.Label();
        // let no = new egret.TextField();
        console.log(data.no);
        no.text = data.no;
        no.width = this.itemCofig.noWidth;
        no.textAlign = 'center';
        no.size = this.itemCofig.lotterySize;
        no.fontFamily = this.itemCofig.lotteryFont;
        no.x = 0;
        no.textColor = 0x000;
        no.y = this.itemCofig.noY;
        group.addChild(no);

        for (var i = 0; i < 8; i++) {
            let ball: eui.Image;
            if (data[`lottery${i}`] >= 19) {
                ball = this.createBitmapByName(this.itemCofig.redBall);
            } else {
                ball = this.createBitmapByName(this.itemCofig.blueBall);
            }
            group.addChild(ball);
            ball.x = this.itemCofig.firstBallX + (ball.width + this.itemCofig.ballSpace) * i;
            ball.y = this.itemCofig.noY;

            let lottery: eui.Label;
            lottery = new eui.Label();
            lottery.text = data[`lottery${i}`];
            lottery.fontFamily = this.itemCofig.lotteryFont;
            lottery.size = this.itemCofig.lotterySize;
            lottery.x = ball.x;
            lottery.y = ball.y;
            lottery.width = ball.width;
            lottery.height = ball.height;
            lottery.textAlign = 'center';
            lottery.verticalAlign = 'middle';
            group.addChild(lottery);
        }

        let time = new eui.Label();
        // let time = new egret.TextField();
        time.text = data.time;
        time.width = this.itemCofig.timeWidth;
        time.x = this.itemCofig.timeX;
        time.fontFamily = this.itemCofig.lotteryFont;
        time.size = this.itemCofig.lotterySize;
        time.y = this.itemCofig.noY;
        time.textColor = 0x000;
        //group.cacheAsBitmap = true;
        return group;
    }

    private createBitmapByName(name: string): eui.Image {
        let result = new eui.Image();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    private createBitmapByName2(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}