class LotteryItem extends eui.ItemRenderer implements eui.IItemRenderer {
    public bg: eui.Image;
    public ltNo: eui.Label;
    public lotteryG: eui.Group;
    public openTime: eui.Label;


    constructor() {
        super();
        this.skinName = "skin.LotterItem";
        this.cacheAsBitmap = true;
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        // this.cacheAsBitmap = true;
        // egret.setTimeout(() => {
        //     for (var key in this.data) {
        //         if (key.indexOf('lottery') != -1 && key.length == 8) {
        //             if (Number(this.data[key]) >= 19) {
        //                 let index = key.substring(7, 8);
        //                 let g = this.lotteryG.getChildAt(Number(index)) as eui.Group;
        //                 let bg = g.getChildAt(0) as eui.Image;
        //                 bg.source = RES.getRes("lotteryitem_redball_png");
        //             }
        //         }
        //     }
        //     this.cacheAsBitmap = true;
        // }, this, 30);


    }
}