FormSeq.prototype.BLChatEvents = function (tmpId) {
  $(document).off("mouseenter.Chatbl").on("mouseenter.Chatbl", ".be-chat", function (event) {
    disable_scroll();
  });
  $(document).off("mouseleave.Chatbl").on("mouseleave.Chatbl", ".be-chat", function (event) {
    enable_scroll();
  });
  $("#t" + tmpId + "_chatScroll").off("mouseenter.Chatbl").on("mouseenter.Chatbl", function (event) {
    if (event.relatedTarget === null) {
      event.stopPropagation();
      return;
    }
    $(".chat-bl").css({
      "overflow-y": "auto",
    });
  });
  $("#t" + tmpId + "_chatScroll").off("mouseleave.Chatbl").on("mouseleave.Chatbl", function (event) {
    if (event.relatedTarget === null) {
      event.stopPropagation();
      return;
    }
    $(".chat-bl").css({
      "overflow-y": "hidden",
    });
  });
  $("#t" + tmpId + "_chatScroll").off("scroll").on("scroll", function (event) {
    HideSuggester();
  });
};

function UpdateChatName(tmpId) {
  var imeshcookie = imeshExist();
  if (notEmpty(usercookie.getParameterValue(imeshcookie, "fn")) || (isSet(ReqObj.UserDetail) && notEmpty(ReqObj.UserDetail.fn) && isSet(ReqObj.UserDetail.fn))) {
    var name = usercookie.getParameterValue(imeshcookie, "fn");
    if (!notEmpty(name)) name = ReqObj.UserDetail.fn;
    $("#t" + tmpId + "_hiid").text("Welcome " + name);
  } else {
    $("#t" + tmpId + "_hiid").text("Welcome");
  }
}