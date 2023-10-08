// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-brown; icon-glyph: magic;
let widget = new ListWidget();
let title = widget.addText("본관 직원식당 중식 메뉴 (아시아나)");
title.font = Font.boldSystemFont(20);
title.textColor = Color.white();
widget.addText("");

let currentDate = new Date();
let currentDayOfWeek = currentDate.getDay();

if (currentDayOfWeek === 0 || currentDayOfWeek === 6) {
  let message = widget.addText("주말에는 운영하지 않습니다.");
  message.font = Font.boldSystemFont(16);
} else {

  let url = "http://www.flyamis.com/chart/date/01";

  let req = new Request(url);
  let html = await req.loadString();

  let startIndex = html.indexOf("아시아나");
  let endIndex = html.indexOf("석식");
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
  body.font = Font.boldSystemFont(16);
}

widget.backgroundColor = new Color("#FFA400");
Script.setWidget(widget);
widget.presentMedium();
Script.complete();