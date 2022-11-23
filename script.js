// These variables are global for optimization purposes only.
const wrap = document.getElementById('wrap');
const draggableEl = document.getElementById("mydiv");
const wrapOffset = getOffset(wrap);
const wrapSize = {
  width: wrap.getBoundingClientRect().width,
  height: wrap.getBoundingClientRect().height
}
const elSize = {
  width: draggableEl.getBoundingClientRect().width,
  height: draggableEl.getBoundingClientRect().height
}
dragElement(draggableEl);

function getOffset(elem) {
  if (elem.getBoundingClientRect) {
    let box = elem.getBoundingClientRect();
    let body = document.body;
    let docElem = document.documentElement;
    let scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
    let scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
    let clientTop = docElem.clientTop || body.clientTop || 0;
    let clientLeft = docElem.clientLeft || body.clientLeft || 0;
    return { top: Math.round(box.top +  scrollTop - clientTop), left: Math.round(box.left + scrollLeft - clientLeft) }
  } else {
    let top=0, left=0
    while(elem) {
      top = top + parseFloat(elem.offsetTop);
      left = left + parseFloat(elem.offsetLeft);
      elem = elem.offsetParent ;
    }
    return {top: top, left: left};
  }
}

function dragElement(el) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(el.id + "header")) {
    document.getElementById(el.id + "header").onmousedown = dragMouseDown;
  } else {
    el.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    let elPosTop = (el.offsetTop - pos2);
    let elPosLeft = (el.offsetLeft - pos1);

    if (elPosLeft > (wrapOffset.left + wrapSize.width - elSize.width) || elPosLeft < (wrapOffset.left + 1)) {// stop the movement if the wrapper border is reached
      closeDragElement();
    } else
      el.style.top = elPosTop + "px";
    if (elPosTop > (wrapOffset.top + wrapSize.height - elSize.height) || elPosTop < (wrapOffset.top + 1)) {// stop the movement if the wrapper border is reached
      closeDragElement();
    } else
      el.style.left = elPosLeft + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}