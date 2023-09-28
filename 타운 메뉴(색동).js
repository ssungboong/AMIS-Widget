// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: purple; icon-glyph: magic;
let now = new Date();
let isLunchTime = now.getHours() >= 0 && now.getHours() < 14;

let widget = new ListWidget();
let title = isLunchTime ? widget.addText("타운 본관 직원식당 중식 메뉴 (색동)") : widget.addText("타운 본관 직원식당 석식 메뉴 (색동)");
title.font = Font.boldSystemFont(20)
title.textColor = Color.white()
widget.addText("");


let url = "http://www.flyamis.com/chart/date/01";

let req = new Request(url);
let html = await req.loadString();

let startIndex = isLunchTime ? html.indexOf("중식") : html.indexOf("석식");
let endIndex = isLunchTime ? html.indexOf("석식") : html.indexOf("아시아나");
let menuText = html.slice(startIndex, endIndex);
let menuItems = menuText.match(/<li>(.*?)<\/li>/g);
let menuString = "";

if (menuItems) {
  menuItems.forEach((item, index) => {
    let menuItem = item.replace(/<\/?li>/g, "").replace(/\([^)]+\)/g, "").trim();
    if (menuItem != "") {
      menuString += menuItem;
      if (index != menuItems.length - 1) {
        menuString += " | ";
      }
    }
  });
} else {
  menuString = "메뉴 정보를 찾을 수 없습니다.";
}

let body = widget.addText(menuString);
body.font = Font.boldSystemFont(16)

widget.backgroundColor = new Color("#00AB84")
Script.setWidget(widget);
widget.presentMedium()
Script.complete();