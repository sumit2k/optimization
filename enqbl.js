

  
  
  function BlStaticQues(tmpId) {
    this.StaticHtml = "";
    this.uploadfiles = 0;
    this.files = "";
    this.deleteId = 0;
    this.className = "BlStaticQues";
    this.attachmentCalled = false;
    this.staticCalled = false;
  }
  BlStaticQues.prototype.hasHtml = function (StaticObj) {
    if (isSet(StaticObj)) {
      // ReqObj.Form[StaticObj.tmpId].Isq.CurrentPageQuestions = [];
      var tmpId = StaticObj.tmpId;
      this.getHtml(tmpId);
      if (this.StaticHtml !== "") {
        ReqObj.Form[tmpId].currentclassCount++;
        this.ifHtmlPresent(StaticObj, tmpId);
      } else {
        this.ifHtmlNotPresent(StaticObj, tmpId);
      }
    }
  };
  
  BlStaticQues.prototype.getHtml = function (tmpId) {
    this.StaticHtml += "<div class='bemt15' id='t" + tmpId + "_isqStatic'>";
    this.StaticData = {
      DATA: [],
    };
    if (!StaticQuesForeignUser(tmpId)) {
      if (!ReqObj.Form[tmpId].flags.isEnrichShown.isAttachmentShown) {
        // for enq attach
        this.isAttachmentCalled = true;
        this.StaticHtml += this.attachFiles(tmpId);
      }
      //this.StaticHtml += this.attachFiles(tmpId);
      if (
        currentISO() === "IN" &&
        !ReqObj.Form[tmpId].flags.isEnrichShown.isStaticShown
      ) {
        this.isStaticCalled = true;
        this.StaticData = {
          DATA: [
            {
              IM_SPEC_MASTER_FULL_DESC: "",
              IM_SPEC_MASTER_ID: "147968",
              IM_SPEC_MASTER_DESC: "Looking for suppliers",
              IM_SPEC_MASTER_TYPE: "2",
              IM_SPEC_OPTIONS_DESC: DataSeparator([
                "Anywhere in India",
                "Local Only",
                "Specific City",
              ]),
              IM_SPEC_OPTIONS_ID: DataSeparator(["386611", "386612", "386613"]),
            },
          ],
        };
      } else if (currentISO() !== "IN") {
        this.isStaticCalled = true;
      }
    } else {
      ReqObj.Form[tmpId].EnrichmentVal = "";
  
      // if (StaticQuesForeignUser(tmpId)) {
      //   this.isStaticCalled = true;
      //   if (ReqObj.Form[tmpId].modrefType.toLowerCase() === "product") {
  
      //     var QuantityUnitArray = [];
      //     var PrioritizedField = ["Unit(s)", "Piece(s)", "Kilogram(s)", "Ton", "Box(es)", "Meter(s)"];
      //     var NormalField = ["Kilogram", "Nos", "Tons", "20' Container", "40' Container", "Bags", "Bag", "Barrel", "Barrels", "Bottles", "Boxes", "Bushel", "Bushels", "Cartons", "Dozens", "Foot", "Gallon", "Grams", "Hectare", "Kilometer", "Kilowatt", "Litre", "Litres", "Long Ton", "Metric Ton", "Metric Tons", "Ounce", "Packets", "Packs", "Pair", "Pairs", "Piece", "Pound", "Reams", "Rolls", "Sets", "Sheets", "Short Ton", "Square Feet", "Square Meters", "Watt"];
      //     QuantityUnitArray = PrioritizedField.concat(NormalField);
      //     var Option_Id = [];
      //     for (var i = 0; i < QuantityUnitArray.length; i++) {
      //       Option_Id.push("1");
      //     }
      //     QuantityUnitArray.push("Other");
      //     Option_Id.push("-99");
      //     this.StaticData = {
      //       "DATA": [
      //         [{
      //           "IM_SPEC_MASTER_FULL_DESC": "",
      //           "IM_SPEC_MASTER_ID": "375782",
      //           "IM_SPEC_MASTER_TYPE": "1",
      //           "IM_SPEC_MASTER_DESC": "Quantity",
      //           "IM_SPEC_OPTIONS_DESC": "None",
      //           "IM_SPEC_OPTIONS_ID": "3433901"
      //         }, {
      //           "IM_SPEC_MASTER_FULL_DESC": "",
      //           "IM_SPEC_MASTER_ID": "376269",
      //           "IM_SPEC_MASTER_TYPE": "3",
      //           "IM_SPEC_MASTER_DESC": "Quantity Unit",
      //           "IM_SPEC_OPTIONS_DESC": DataSeparator(QuantityUnitArray),
      //           "IM_SPEC_OPTIONS_ID": DataSeparator(Option_Id)
      //         }]
      //       ]
      //     };
      //   }
  
      // }
    }
    ReqObj.Form[tmpId].prevCount = 0;
    ReqObj.Form[tmpId].stopper = 0;
    ReqObj.Form[tmpId].stopper =
      Math.min(3, this.StaticData.DATA.length - ReqObj.Form[tmpId].prevCount) +
      ReqObj.Form[tmpId].prevCount;
    ReqObj.Form[tmpId].Isq.CurrentPageQuestions = [];
    var city =
      isSet(ReqObj.Form[tmpId].preFilledIsq["looking for suppliers"]) &&
      isSet(ReqObj.Form[tmpId].preFilledIsq["looking for suppliers"][0])
        ? ReqObj.Form[tmpId].preFilledIsq["looking for suppliers"][0]
        : "";
    this.prefilled = city;
    this.TraverseStaticQuestion(tmpId);
  
    this.StaticHtml += "</div>";
  };
  
  BlStaticQues.prototype.ifHtmlPresent = function (StaticObj, tmpId) {
    if (this.isStaticCalled === true) {
      ReqObj.Form[StaticObj.tmpId].flags.isEnrichShown.isStaticShown = true; // for enq attach
    }
    if (this.isAttachmentCalled === true) {
      ReqObj.Form[StaticObj.tmpId].flags.isEnrichShown.isAttachmentShown = true; // for enq attach
      ReqObj.Form[StaticObj.tmpId].isAttachmentShown = true;
    }
    StaticObj.that.NumberofClassCalled -= 1;
    AttachObject(StaticObj.object, tmpId);
    if (isSet(StaticObj.AfterService)) {
      for (var i = 0; i < StaticObj.AfterService.length; i++) {
        StaticObj.that.MakeSeq(StaticObj.AfterService[i], tmpId);
      }
    }
    if (StaticObj.that.NumberofClassCalled === 0) {
      makeFinalSeq(StaticObj, tmpId);
    }
  };
  
  BlStaticQues.prototype.ifHtmlNotPresent = function (StaticObj, tmpId) {
    if (StaticObj.hasFallback) {
      CreateSeq(StaticObj.FallbackObj);
    }
  };
  
  BlStaticQues.prototype.TraverseStaticQuestion = function (tmpId) {
    var finalIsqQuestions = [];
    var finalIsqQuestions2 = [];
    var CurrentPageQuestions = [];
    for (
      var i = ReqObj.Form[tmpId].prevCount;
      i < ReqObj.Form[tmpId].stopper;
      i++
    ) {
      ReqObj.Form[tmpId].Isq.Question = [];
  
      // whole_wrapper += "<div id=t" + tmpId + "isq_div" + ReqObj.Form[tmpId].IsqDiv + " class='be-row'>";
      ReqObj.Form[tmpId].toGetCurrentPagestring = true;
      FindIsqObject(this.StaticData.DATA[i], tmpId, 0, false, finalIsqQuestions);
      FindIsqObjectQuestions(
        this.StaticData.DATA[i],
        tmpId,
        0,
        false,
        finalIsqQuestions2
      );
  
      CurrentPageQuestions.push(ReqObj.Form[tmpId].Isq.Question);
    }
    ReqObj.Form[tmpId].Isq.CurrentPageQuestions.push(CurrentPageQuestions);
    ReqObj.Form[tmpId].prevCount = ReqObj.Form[tmpId].stopper;
    // if (whole_wrapper !== "") {
    //   whole_wrapper = IsqContainer + whole_wrapper + "</div>";
    // }
    var IsqBoxSuffixOuterHtml = "";
    var IsqBoxSuffixClosingHtml = "";
    var IsqBoxSuffixHtmlObj = {
      SuffixOuterHtml: IsqBoxSuffixOuterHtml,
      SuffixClosingHtml: IsqBoxSuffixClosingHtml,
      suffix: "",
    };
  
    //sthis.StaticHtml += MakeWrapper(finalIsqQuestions, tmpId, IsqBoxSuffixHtmlObj);
    this.StaticHtml += MakeWrapper(
      finalIsqQuestions,
      tmpId,
      IsqBoxSuffixHtmlObj,
      ""
    );
    // return whole_wrapper;
  };
  
  BlStaticQues.prototype.displayHtml = function (tmpId) {
    if (isOtherEnq(tmpId)) {
      ReqObj.Form[tmpId].calledClassName[
        ReqObj.Form[tmpId].FormSequence.StepCounter
      ] = this.className;
    }
    return [this.StaticHtml];
  };
  BlStaticQues.prototype.attachFiles = function (tmpId) {
    if (isSSB(tmpId)) return SSBAttachFile(tmpId);
    // var div = '<div><ul class="be-att">';
    // var style = "";
    // var div1 = "";
    // var li = "";
    // for (var i = 1; i < 5; i++) {
    //     if (ReqObj.Form[tmpId].flags.isDescDivShown === true) {
    //         li = (i === 1) ? '<li class="attch_add"' : '<li class="attch_add bedsnone"';
    //         style = (i === 1) ? 'style="clear:both;border-top:1px solid #dfd8d8"' : 'style="border-left:0px;border-top:1px solid #dfd8d8"';
    //     } else {
    //         li = (i === 1) ? '<li class="attch_add"' : '<li class="attch_add bedsnone"';
    //         style = (i === 1) ? 'style="clear:both;"' : 'style="border-left:0px"';
    //     }
  
    //     if (i < 4) {
    //         div1 = '<div id="t' + tmpId + 'attachaddmore' + i + '" class="add_More bedsnone">+</div>';
    //     }
  
    //     div += li + 'id="t' + tmpId + 'attachment_div_' + i + '"' + style + '>' + div1 + '<span id="t' + tmpId + 'add_attachment_' + i + '" class="att Be9"><span class="Be10">Attach Files</span></span><div class="posi flt-rgt pdz bedsnone" id="t' + tmpId + 'upload_indicator_' + i + '"><img src=""></div><span href="#" id="t' + tmpId + 'file_attached_' + i + '" class="att2 Be11 bedsnone" target="_blank"></span><span id="t' + tmpId + 'remove_attachment_' + i + '" class="blnewform_sprit Be12 bedsnone"></span><div class="attch_add bedsnone" style="height:150px;"><iframe id="t' + tmpId + 'add_attach_iframe_' + i + '" name="t' + tmpId + 'add_attach_iframe_' + i + '" style="width:100%;height:80px;" border="0" framespacing="0" allowtransparency="true"></iframe><input type="file" id="t' + tmpId + 'input_attach_' + i + '" style="height: 0px; width: 0px;visibility: hidden;" name="image"><input type="hidden" id="t' + tmpId + 'type_' + i + '"><input type="hidden" name="t' + tmpId + 'attachment_path_' + i + '" value="" id="t' + tmpId + 'attachment_path_' + i + '"><input type="hidden" name="t' + tmpId + 'attachment_file_name_' + i + '" value="" id="t' + tmpId + 'attachment_file_name_' + i + '"><input type="hidden" name="success-url" value= "$server_name/eto-upload-attachment.mp" id="t' + tmpId + 'success_url_' + i + '"><input type="hidden" name="failure-url" value="$server_name/eto-upload-attachment.mp" id="t' + tmpId + 'failure_url_' + i + '"><input type="hidden" name="t' + tmpId + 'img_small_ori_' + i + '" value="" id="t' + tmpId + 'img_small_ori_' + i + '"><input type="hidden" name="t' + tmpId + 'myfile_doc_' + i + '" value="" id="t' + tmpId + 'myfile_doc_' + i + '"></li>';
    // }
  
    // div += '</ul></div>';
    // return div;
    var cbl_br = (pdpInactiveBL(tmpId)) ? "cbl_br10" : "";
    var width_par = (pdpInactiveBL(tmpId)) ? "width: 130px; margin-bottom: 20px;" : "";
    var inline = (pdpInactiveBL(tmpId)) ? "" : "style = 'padding-bottom:20px;'";
    var div =
      '<div id="t' +
      tmpId +
      "myDIV" +
      '" class ="inAtch '+ cbl_br + '" style ="text-align:center;clear:both;border-top:1px solid #dfd8d8;'+ width_par +'"><input type="file" id="t' +
      tmpId +
      "myInput" +
      '"  class = "" ><span id="t0102add_attachment_1" class="att Be9"><span id= "t' +
      tmpId +
      "attachfiles" +
      '"  class="Be10">Attach Files</span></span></div><ul id="t' +
      tmpId +
      "myUL" +
      '" class = "myUL" ' + inline + '></ul>';
    return div;
  };
  BlStaticQues.prototype.SaveDetails = function (tmpId) {
    SaveIsq(tmpId, "static", 0);
  
    if ($("#spcity").length > 0) {
      ReqObj.Form[tmpId].Static.enrichCityDetail = {};
      ReqObj.Form[tmpId].Static.enrichCity1 = $(
        "#t" + tmpId + "_enrich_city1"
      ).val();
      ReqObj.Form[tmpId].Static.enrichCity2 = $(
        "#t" + tmpId + "_enrich_city2"
      ).val();
      ReqObj.Form[tmpId].Static.enrichCity3 = $(
        "#t" + tmpId + "_enrich_city3"
      ).val();
      ReqObj.Form[tmpId].Static.enrichCity1id = $(
        "#t" + tmpId + "_enrich_city1specificcity_hidden"
      ).val();
      ReqObj.Form[tmpId].Static.enrichCity2id = $(
        "#t" + tmpId + "_enrich_city2specificcity_hidden"
      ).val();
      ReqObj.Form[tmpId].Static.enrichCity3id = $(
        "#t" + tmpId + "_enrich_city3specificcity_hidden"
      ).val();
      ReqObj.Form[tmpId].Static.enrichCityDetail[
        ReqObj.Form[tmpId].Static.enrichCity1
      ] = ReqObj.Form[tmpId].Static.enrichCity1id;
      ReqObj.Form[tmpId].Static.enrichCityDetail[
        ReqObj.Form[tmpId].Static.enrichCity2
      ] = ReqObj.Form[tmpId].Static.enrichCity2id;
      ReqObj.Form[tmpId].Static.enrichCityDetail[
        ReqObj.Form[tmpId].Static.enrichCity3
      ] = ReqObj.Form[tmpId].Static.enrichCity3id;
    }
    for (var i = 1; i < 5; i++) {
      if ($("#t" + tmpId + "file_attached_" + i).length > 0) {
        ReqObj.Form[tmpId].Static["img_small_ori_" + i] = $(
          "#t" + tmpId + "img_small_ori_" + i
        ).val();
        ReqObj.Form[tmpId].Static["myfile_doc_" + i] = $(
          "#t" + tmpId + "myfile_doc_" + i
        ).val();
      } else {
        ReqObj.Form[tmpId].Static["img_small_ori_" + i] = "";
        ReqObj.Form[tmpId].Static["myfile_doc_" + i] = "";
      }
    }
  };
  
  BlStaticQues.prototype.getData = function (tmpId) {
    var enrichObj = {};
    enrichObj["modid"] = ReqObj.Form[tmpId].modId;
    enrichObj["offer_id"] = ReqObj.Form[tmpId].generationId;
    enrichObj["s_glusrid"] = usercookie.getParameterValue(imeshExist(), "glid");
    enrichObj["blEnqFlag"] = IsChatbl(tmpId) ? "BL" : ReqObj.Form[tmpId].formType;
    enrichObj["updatevalue"] = "updatevalue";
    if (isSet(ReqObj.Form[tmpId].Static.enrichCityDetail)) {
      var city = Object.keys(ReqObj.Form[tmpId].Static.enrichCityDetail);
      for (var i = 0; i < 3; i++) {
        var index = i + 1;
        if (
          isSet(city[i]) &&
          isSet(ReqObj.Form[tmpId].Static.enrichCityDetail[city[i]])
        ) {
          enrichObj["enrichCity" + index] = city[i];
          enrichObj["enrichCity" + index + "id"] =
            ReqObj.Form[tmpId].Static.enrichCityDetail[city[i]];
        } else {
          enrichObj["enrichCity" + index] = "";
          enrichObj["enrichCity" + index + "id"] = "";
        }
      }
    }
    // enrichObj.enrichCity1 = ReqObj.Form[tmpId].Static.enrichCity1;
    // enrichObj.enrichCity2 = ReqObj.Form[tmpId].Static.enrichCity2;
    // enrichObj.enrichCity3 = ReqObj.Form[tmpId].Static.enrichCity3;
    // enrichObj.enrichCity1id = ReqObj.Form[tmpId].Static.enrichCity1id;
    // enrichObj.enrichCity2id = ReqObj.Form[tmpId].Static.enrichCity2id;
    // enrichObj.enrichCity3id = ReqObj.Form[tmpId].Static.enrichCity3id;
    if (ReqObj.Form[tmpId].formType.toLowerCase() === "enq") {
      enrichObj["r_glusrid"] = ReqObj.Form[tmpId].rcvGlid;
      enrichObj["q_dest"] = ReqObj.Form[tmpId].query_destination;
    }
    if (
      isSet(ReqObj.Form[tmpId].Static.optionsValue) &&
      ReqObj.Form[tmpId].Static.optionsValue.length > 0
    ) {
      if (isSet(ReqObj.Form[tmpId].Static.questionsDesc)) {
        for (var i = 0; i < ReqObj.Form[tmpId].Static.questionsDesc.length; i++) {
          enrichObj.prefered_suppliers_location =
            ReqObj.Form[tmpId].Static.questionsDesc[i] === "Looking for suppliers"
              ? ReqObj.Form[tmpId].Static.optionsValue[i]
              : ""; // looking for suppliers
          // if (StaticQuesForeignUser(tmpId)) {
          //   if (ReqObj.Form[tmpId].Static.questionsDesc[i].toLowerCase() === "quantity")
          //     enrichObj["enrichDesc"] += ReqObj.Form[tmpId].Static.questionsDesc[i] + ": " + ReqObj.Form[tmpId].Static.optionsValue[i] + " ";
          //   else if (ReqObj.Form[tmpId].Static.questionsDesc[i].toLowerCase() === "quantity unit")
          //     enrichObj["enrichDesc"] += ReqObj.Form[tmpId].Static.optionsValue[i];
          // }
        }
      }
    }
    for (var i = 1; i < 5; i++) {
      enrichObj["img_small_ori_" + i] =
        ReqObj.Form[tmpId].Static["img_small_ori_" + i];
      enrichObj["myfile_doc_" + i] = ReqObj.Form[tmpId].Static["myfile_doc_" + i];
    }
    if (ReqObj.Form[tmpId].ReqDtlBox === "") {
      enrichObj["enrichDesc"] = trimVal(enrichObj["enrichDesc"]);
      if (isSet(enrichObj["enrichDesc"]) && enrichObj["enrichDesc"] !== "")
        enrichObj["enrichDesc"] =
          enrichObj["enrichDesc"][enrichObj["enrichDesc"].length - 1] === ","
            ? enrichObj["enrichDesc"].slice(0, -1)
            : enrichObj["enrichDesc"];
    }
    ReqObj.Form[tmpId].EnrichmentVal = enrichObj["enrichDesc"];
    if (isSet(ReqObj.Form[tmpId].ReqDtlBox)) {
      if (ReqObj.Form[tmpId].ReqDtlBox !== "")
        enrichObj["enrichDesc"] =
          isSet(enrichObj["enrichDesc"]) && enrichObj["enrichDesc"] !== ""
            ? ReqObj.Form[tmpId].ReqDtlBox + ", " + enrichObj["enrichDesc"]
            : ReqObj.Form[tmpId].ReqDtlBox;
      else enrichObj["enrichDesc"] = enrichObj["enrichDesc"];
    }
    return ObjectTrim(enrichObj);
  };
  
  BlStaticQues.prototype.onSubmit = function (tmpId) {
    var enrichObj = this.getData(tmpId);
    var PreStaticObj = PreAjax("BlStaticQues", tmpId);
    if (isObjectEmpty(enrichObj) && ValidGenId(ReqObj.Form[tmpId].generationId))
      fireAjaxRequest({
        data: {
          ga: {
            s: true,
            f: true,
            gatype: "saveEnrichment",
            source: "",
          },
          tmpId: tmpId,
          ajaxObj: {
            obj: PreStaticObj,
            s: {
              ss: 1,
              sf: {
                af: 0,
                pa: 0,
              },
              f: 1,
            },
            f: {
              f: 1,
            },
          },
          ajaxtimeout: 3000,
          ajaxdata: enrichObj,
          hitfinserv: "",
          type: 1,
        },
      });
    else PostAjax(PreStaticObj, tmpId);
  };
  //BlStaticQues.prototype.GetDetail = function (tmpId) {};
  BlStaticQues.prototype.displayAnswer = function (tmpId) {
    var classtotest = chatBlClass(tmpId, "right");
    var leftright = IsChatbl(tmpId) ? "message-right1" : "";
    return [
      ConversationRightWrapper(tmpId, GetAnswer(tmpId, "static"), {
        classtotest: classtotest,
        leftright: leftright,
      }),
    ];
  };
  
  BlStaticQues.prototype.defaultEventsForAttach = function (tmpId) {
    var that = this;
    RadioClick(tmpId);
    $("#t" + tmpId + "myInput").on(
      "change",
      {
        tmpId: tmpId,
        // loop: i,
        modId: ReqObj.Form[tmpId].modId,
        that: that,
      },
      that.uploadFile
    );
    for (var i = 1; i < 5; i++) {
      $("#t" + tmpId + "add_attachment_" + i).on(
        "click",
        {
          tmpId: tmpId,
          loop: i,
        },
        that.openWin
      );
      $("#t" + tmpId + "input_attach_" + i).on(
        "change",
        {
          tmpId: tmpId,
          loop: i,
          modId: ReqObj.Form[tmpId].modId,
          that: that,
        },
        that.uploadFile
      );
      $("#t" + tmpId + "attachaddmore" + i).on(
        "click",
        {
          tmpId: tmpId,
          todo: "addMoreAttachments",
          loop: i,
        },
        that.handleUI
      );
      $("#t" + tmpId + "remove_attachment_" + i).on(
        "click",
        {
          tmpId: tmpId,
          loop: i,
          that: that,
        },
        that.deleteFileOg
      ); //attachfilesellers
    }
  };
  BlStaticQues.prototype.deleteFileOg = function (event) {
    //attachfilesellers
    if (isSet(event) && isSet(event.data)) {
      var tmpId = event.data.tmpId;
      var i = event.data.loop;
      var obj = event.data.that;
      $.ajax({
        url: appsServerName + "index.php?r=enrichform/DeleteAttachment",
        data: { file: $("#t" + tmpId + "attachment_file_name_" + i).val() },
        dataType: "json",
        type: "GET",
        success: function (res) {
          if (isSet(res)) {
            obj.handleUI({ data: { tmpId: tmpId, loop: i, todo: "deleteFile" } });
          }
        },
        error: function (res) {},
      });
    }
  };
  
  BlStaticQues.prototype.openWin = function (event) {
    var tmpId = event.data.tmpId;
    var i = event.data.loop;
    $("#t" + tmpId + "input_attach_" + i).val(null);
    $("#t" + tmpId + "input_attach_" + i).click();
  };
  
  BlStaticQues.prototype.getFileData = function (
    tmpId,
    attachLoop,
    modid,
    obj,
    mode,
    event
  ) {
    //if ($("#t" + tmpId + "input_attach_" + attachLoop).val() === null)
    if (
      $("#t" + tmpId + "myInput").val() === null ||
      $("#t" + tmpId + "input_attach_" + attachLoop).val() === null
    )
      //attachfilesellers
  
      return "";
    else {
      if (isSet(obj)) {
        var f = 0;
        // var attachment = $("#t" + tmpId + "input_attach_" + attachLoop)[0];
        var attachment =
          modid === "SELLERS" && isSSB(tmpId)
            ? $("#t" + tmpId + "input_attach_" + attachLoop)[0]
            : $("#t" + tmpId + "myInput")[0]; //attachfilesellers
        obj.file = attachment.files[0];
  
        if (mode === "1") obj.file = event.File;
  
        var data = new FormData();
        if (isSet(obj.file)) data.append("IMAGE", obj.file);
  
        var name = isSet(obj.file) ? obj.file.name : ""; // js error TypeError Cannot read properties of undefined (reading 'name')
        name = name.replace(/\'+/g, "_"); /* ' replaced by _ */
        var row_value = 0;
        var img_value = "";
  
        if (/\//.test(name)) {
          var my_array = name.split("/");
          row_value = my_array[my_array.length - 1];
        } else {
          var my_array = name.split("\\");
          row_value = my_array[my_array.length - 1];
        }
  
        img_value = row_value.replace(/\\s+/g, "-");
        img_value = img_value.toLowerCase();
  
        if (img_value.indexOf("\\") > -1) {
          img_value = img_value.replace(/\\/g, "/");
        }
        if (img_value.indexOf(" ") > -1) {
          img_value = img_value.replace(/ /g, "-");
        }
  
        var img_value_name = img_value.substr(img_value.lastIndexOf("/") + 1);
  
        $("#t" + tmpId + "attachment_file_name_" + attachLoop).value =
          img_value_name;
  
        if (img_value_name.length > 65) {
          f = 1;
          alert("Filename cannot have more than 65 characters");
        }
  
        var img_value_name1 = img_value_name.split(".");
  
        if (img_value_name1.length > 2) {
          f = 1;
          alert("Filename cannot contain dot(.)");
        }
        if (img_value_name.lastIndexOf(" ") > -1) {
          f = 1;
          alert(
            "Filename can contain only alphabets (a-z A-Z) , numbers (0-9) , underscore (_) or hiphen (-)"
          );
        }
  
        var ext = img_value.substr(img_value.indexOf("."), img_value.length);
        ext = ext.toLowerCase();
        if (
          ext === ".jpg" ||
          ext === ".gif" ||
          ext === ".png" ||
          ext === ".jpeg"
        ) {
          $("#t" + tmpId + "type_" + attachLoop).val("default");
        } else if (
          ext === ".pdf" ||
          ext === ".doc" ||
          ext === ".docx" ||
          ext === ".xls" ||
          ext === ".xlsx" ||
          ext === ".txt" ||
          ext === ".rtf" ||
          ext === ".ppt" ||
          ext === ".pptx"
        ) {
          $("#t" + tmpId + "type_" + attachLoop).val("doc");
        } else {
          f = 1;
          alert(
            "Attachment can be either of jpg / gif / png / pdf / doc / docx / xls / xlsx / txt / rtf / ppt / pptx file extensions only"
          );
        }
  
        $("#t" + tmpId + "upload_indicator_" + attachLoop).removeClass(
          "bedsnone"
        );
  
        data.append("MODID", modid);
        data.append("USR_ID", usercookie.getParameterValue(imeshExist(), "glid"));
        data.append("IMAGE_TYPE", "Rfq");
        data.append("UPLOADED_BY", "User");
  
        if (f === 1) {
          return false;
        }
  
        return data;
      }
    }
  };
  
  BlStaticQues.prototype.defaultEvents = function (tmpId) {
    this.defaultEventsForAttach(tmpId);
    SelectBoxEvents(tmpId);
    InputBoxEvents();
  
    CheckBoxClick(tmpId);
    $(document).on("hover", ".info_iconeqbl", function () {
      $(this).children(".full_desc").removeClass("bedsnone");
    });
    $(document).on("mouseout", ".info_iconeqbl", function () {
      $(this).children(".full_desc").addClass("bedsnone");
    });
    RadioClick(tmpId);
    $(".t" + tmpId + "other_radiotemp")
      .off("click")
      .on("click", function (event) {
        if ($(this).hasClass("t" + tmpId + "be-radioboxtemp")) {
          $(this)
            .siblings()
            .each(function () {
              if ($(this).parent().css("display") === "block") {
                isRadioOtherClicked(this);
              }
            });
        }
      });
    get_buyer_info(tmpId);
    if (imeshExist() !== "" && !pdpInactiveBL(tmpId))
      $("#t" + tmpId + "_leftR").removeClass("lftMgn");
    if (
      isSet(this.prefilled) &&
      this.prefilled.toLowerCase() === "specific city"
    ) {
      findPrefilledcity(
        ReqObj.Form[tmpId].preFilledIsq["preferred_location"],
        tmpId
      );
      enrichCityhtml(
        $(".specCity")[0].id,
        "t" + tmpId,
        1,
        ReqObj.Form[tmpId].staticPrefilledCity
      );
    }
  };
  
  function findPrefilledcity(cityString, tmpId) {
    var city1 = "",
      city2 = "",
      city3 = "",
      tempvar;
    if (isSet(cityString)) {
      if (cityString.includes(",")) {
        cityString = cityString.split(",");
        city1 = cityString[0].trim().split(" ");
        city1 = city1[city1.length - 1];
        tempvar = cityString[1].trim().split(" ");
        city2 = tempvar[0];
        city3 = tempvar[2];
      } else if (cityString.includes("and")) {
        cityString = cityString.split("from");
        cityString = cityString[1].trim().split(" ");
        city1 = cityString[0];
        city2 = cityString[2];
      } else if (cityString.includes("from")) {
        cityString = cityString.split("from");
        cityString = cityString[1].trim().split(" ");
        city1 = cityString[0];
      }
    }
    ReqObj.Form[tmpId].staticPrefilledCity = [city1, city2, city3];
  }
  
  BlStaticQues.prototype.EventIfScreenPresent = function (tmpId) {
    if (isOtherEnq(tmpId)) {
      this.handleHeading(tmpId);
      ButtonNameUI("isq", tmpId);
    }
  };
  
  BlStaticQues.prototype.handleHeading = function (tmpId) {
    if (ReqObj.Form[tmpId].formType.toLowerCase() !== "enq")
      $("#t" + tmpId + "_hdg")
        .removeClass("bedsnone")
        .html(getFormHeading(tmpId, ReqObj.Form[tmpId].currentScreen));
    else {
      if (
        isImageVidEnq(tmpId) &&
        ReqObj.Form[tmpId].FormSequence.StepCounter === 0
      )
        $("#t" + tmpId + "_hdg")
          .addClass("bedsnone")
          .html("");
      else
        $("#t" + tmpId + "_hdg")
          .removeClass("bedsnone")
          .html(getFormHeading(tmpId, ReqObj.Form[tmpId].currentScreen));
      if (isOtherEnq(tmpId)) ButtonNameUI("staticques", tmpId);
    }
  };
  
  BlStaticQues.prototype.handleButton = function (tmpId) {
    ButtonNameUI(ReqObj.Form[tmpId].currentScreen, tmpId);
  };
  
  BlStaticQues.prototype.validate = function (tmpId) {
    return ValidateQuestions(tmpId, true, 0);
  };
  
  function deleteAttachedFile(event) {
    // console.log(event.target);
    event.target.parentElement.style.display = "none";
    BlStaticQues.prototype.deleteFile(event);
  }
  
  var attachcounter = 0;
  var attachnumber = [0, 1, 2, 3];
  BlStaticQues.prototype.uploadFile = function (event, mode) {
    var tmpId = event.data.tmpId;
    ReqObj["Temp_Id"] = tmpId;
    var i = event.data.loop;
    var modid = event.data.modId;
    var obj = event.data.that;
    if (!isSet(event.mode)) event.mode = "0";
    var data = obj.getFileData(tmpId, i, modid, obj, event.mode, event);
    if (imeshExist() === "" && isSSB(tmpId) && data !== "" && data !== false) {
      event.File = event.data.that.file;
      event.mode = "1";
      attachmentCode(tmpId, event);
      return;
    }
  
    if (data !== "" && data !== false) {
      var url = "";
      if (appsServerName === "//dev-apps.imimg.com/")
        url = "https://dev-uploading.imimg.com/uploadimage";
      else if (appsServerName === "//stg-apps.imimg.com/")
        url = "https://stg-uploading.imimg.com/uploadimage";
      else url = "https://uploading.imimg.com/uploadimage";
  
      if (
        isObjectEmpty(data) &&
        (ValidGenId(ReqObj.Form[tmpId].generationId) || isSSB(tmpId))
      ) {
        $.ajax({
          url: url,
          type: "POST",
          data: data,
          processData: false,
          contentType: false,
          success: function (response) {
            if (isSet(response)) {
              if (parseInt(response.Code) === 200) {
                obj.uploadfiles++;
                var filepath = response.Data.AwsPath.Image_Original_Path;
                var filename_orig = obj.file.name;
                var filename = filepath.substring(filepath.lastIndexOf("/") + 1);
                if (response.Status === "Success") {
                  if (modid === "SELLERS" && isSSB(tmpId)) {
                    //attachfilesellers
                    $("#t" + tmpId + "file_attached_" + i).attr("href", filepath);
                    $("#t" + tmpId + "file_attached_" + i).html(filename_orig);
                    $("#t" + tmpId + "attachment_path_" + i).val(filepath);
                    $("#t" + tmpId + "attachment_file_name_" + i).val(filename);
                  } else {
                    if (!(isSSB(tmpId) && mode == "1")) {
                      if (attachcounter < 5) {
                        var attachhtml =
                          '<li class = "myLI" style = "text-align:center;clear:both;border:1px solid #dfd8d8; margin-bottom:4px"><span class="att2 Be11" href = "' +
                          filepath +
                          '" target="_blank"> ' +
                          filename +
                          ' </span><span class="close blnewform_sprit Be12"  onclick = "deleteAttachedFile(event)"></span></li>';
                        $("#t" + tmpId + "myUL").append(attachhtml);
                        $("#t" + tmpId + "myInput").val("");
                        attachcounter += 1;
                        if (attachcounter == 4) {
                          $("#t" + tmpId + "myDIV")
                            .attr("disabled", "disabled")
                            .css({
                              opacity: "0.4",
                              cursor: "default",
                            });
                          $("#t" + tmpId + "attachfiles").addClass("grey");
  
                          $("#t" + tmpId + "myInput").attr("disabled", true);
                        }
                      }
                    }
                  }
  
                  if ($("#t" + tmpId + "type_" + i).val() === "default")
                    $("#t" + tmpId + "img_small_ori_" + i).val(filepath);
                  else $("#t" + tmpId + "myfile_doc_" + i).val(filepath);
                  obj.handleUI({
                    data: {
                      todo: "uploadSuccess",
                      tmpId: tmpId,
                      loop: i,
                    },
                  });
                } else {
                  alert(response.Reason);
                  obj.handleUI({
                    data: {
                      todo: "uploadFailure",
                      tmpId: tmpId,
                      loop: i,
                    },
                  });
                  if (isSSB(tmpId) && toDeleteAttachment(tmpId))
                    obj.handleUI({
                      data: {
                        tmpId: tmpId,
                        loop: i,
                        todo: "deleteFile",
                      },
                    });
                  return false;
                }
              } else {
                alert(response.Reason);
                obj.handleUI({
                  data: {
                    todo: "uploadFailure",
                    tmpId: tmpId,
                    loop: i,
                  },
                });
                if (isSSB(tmpId) && toDeleteAttachment(tmpId))
                  obj.handleUI({
                    data: {
                      tmpId: tmpId,
                      loop: i,
                      todo: "deleteFile",
                    },
                  });
                return false;
              }
            }
          },
          error: function () {
            alert("File is not uploaded.Please try again...");
            obj.handleUI({
              data: {
                todo: "uploadFailure",
                tmpId: tmpId,
                loop: i,
              },
            });
            if (isSSB(tmpId) && toDeleteAttachment(tmpId))
              obj.handleUI({
                data: {
                  tmpId: tmpId,
                  loop: i,
                  todo: "deleteFile",
                },
              });
  
            return false;
          },
        });
      }
    }
  };
  BlStaticQues.prototype.handleUI = function (event) {
    var todo = event.data.todo;
    var tmpId = event.data.tmpId;
    var i = event.data.loop;
  
    if (todo === "uploadSuccess") {
      $("#t" + tmpId + "remove_attachment_" + i).removeClass("bedsnone");
      $("#t" + tmpId + "add_attachment_" + i).addClass("bedsnone");
      var flag = 0;
      for (var k = 1; k < 5; k++) {
        //attachfileseller
        if (
          !$("#t" + tmpId + "add_attachment_" + k).hasClass("bedsnone") &&
          !$("#t" + tmpId + "attachment_div_" + k).hasClass("bedsnone")
        )
          flag = 1;
        if (
          !$("#t" + tmpId + "attachment_div_" + k).hasClass("bedsnone") &&
          !$("#t" + tmpId + "attachaddmore" + k).hasClass("bedsnone")
        )
          flag = 1;
      }
      $("#t" + tmpId + "upload_indicator_" + i).addClass("bedsnone");
      $("#t" + tmpId + "file_attached_" + i).removeClass("bedsnone");
      $("#t" + tmpId + "attachaddmore" + i).removeClass("bedsnone");
    }
    if (todo === "uploadFailure") {
      $("#t" + tmpId + "upload_indicator_" + i).addClass("bedsnone");
    }
    if (todo === "addMoreAttachments") {
      var j = i + 1;
      $("#t" + tmpId + "attachment_div_" + j).removeClass("bedsnone");
      $("#t" + tmpId + "attachaddmore" + i).addClass("bedsnone");
    }
    if (todo === "deleteFile") {
      $("#t" + tmpId + "addmore_attachment" + i).addClass("bedsnone");
      $("#t" + tmpId + "file_attached_" + i).attr("href", "");
      $("#t" + tmpId + "file_attached_" + i).html("");
      $("#t" + tmpId + "file_attached_" + i).addClass("bedsnone");
      $("#t" + tmpId + "attachment_path_" + i).val("");
      $("#t" + tmpId + "attachment_file_name_" + i).val("");
      $("#t" + tmpId + "remove_attachment_" + i).addClass("bedsnone");
      $("#t" + tmpId + "add_attachment_" + i).removeClass("bedsnone");
      $("#t" + tmpId + "upload_indicator_" + i).removeClass("bedsnone");
      $("#t" + tmpId + "attachaddmore" + i).addClass("bedsnone");
      $("#t" + tmpId + "img_small_ori_" + i).val("");
      $("#t" + tmpId + "myfile_doc_" + i).val("");
    }
  };
  BlStaticQues.prototype.deleteFile = function (event) {
    // var tmpId = event.data.tmpId;
    var tmpId = ReqObj["Temp_Id"];
    // var i = event.data.loop;
  
    // var i = parseInt(event.target.attributes.name.value);
    // var obj = event.data.that;
    if (imeshExist() === "" && isSSB(tmpId) && toDeleteAttachment(tmpId)) {
      var i = parseInt(event.target.attributes.name.value);
      deleteAttCode(tmpId, i);
    } else {
      $.ajax({
        url: appsServerName + "index.php?r=enrichform/DeleteAttachment",
        data: {
          file: event.target.parentElement.childNodes[0].innerHTML,
        },
        dataType: "json",
        type: "GET",
        success: function (res) {
          if (isSet(res)) {
            // obj.handleUI({
            //     data: {
            //         tmpId: tmpId,
            //         loop: i,
            //         todo: "deleteFile"
            //     }
            // });
  
            var tmpId = ReqObj["Temp_Id"];
            attachcounter -= 1;
  
            $("#t" + tmpId + "myDIV")
              .removeAttr("disabled")
              .css({
                opacity: "1",
                cursor: "pointer",
              });
  
            $("#t" + tmpId + "attachfiles").removeClass("grey");
            $("#t" + tmpId + "myInput").removeAttr("disabled", true);
          }
        },
        error: function (res) {},
      });
    }
  };
  
  
  function InlineDefault(tmpId) {
    $("#t" + tmpId + "_allBtn").html("");
    $("#t" + tmpId + "_thankDiv")
      .html("")
      .addClass("bedsnone");
    if (!ispdp(tmpId)) {
      $("#t" + tmpId + "_mcont").css({
        display: "flex",
      });
    }
  }
  
  function ShowSkip(array, tmpId) {
    var MandatoryClass = ["Isq", "BlStaticQues"];
    if (isSet(array)) {
      for (var i = 0; i < array.length; i++) {
        if ($.inArray(ConstructorName(array[i].Obj), MandatoryClass) !== -1)
          return false;
      }
      return true;
    }
    return true;
  }
  
  function ShowButton(array, tmpId) {
    // MoreDetails
    var HideButtonClass = [
      "ThankYou",
      "UserVerification",
      "ProductNameQuestion",
      "UserLogin",
      "ProductName",
      "ContactDetail",
      "TermsConditions",
      "CountrySugg",
    ];
    if (isSet(array)) {
      for (var i = 0; i < array.length; i++) {
        if ($.inArray(ConstructorName(array[i].Obj), HideButtonClass) !== -1)
          return false;
      }
      return true;
    }
    return true;
  }
  
  function IsPrevStepAvailable(tmpId) {
    if (IsPrevBtnImplemented(tmpId)) {
      var that = ReqObj.Form[tmpId].FormSequence;
      if (
        isSet(ReqObj.Form[tmpId].IsthroughClosebtn) &&
        !ReqObj.Form[tmpId].IsthroughClosebtn
      ) {
        var CurrentArray = [];
        if (that.OnCloseCounter > -1) {
          if (that.OnCloseCounter > 0) {
            CurrentArray =
              ReqObj.Form[tmpId].OnCloseArray[that.OnCloseCounter - 1];
          } else {
            CurrentArray = ReqObj.Form[tmpId].UiArray[that.StepCounter];
          }
        } else {
          if (that.StepCounter > 0) {
            CurrentArray = ReqObj.Form[tmpId].UiArray[that.StepCounter - 1];
          } else {
            CurrentArray = [];
          }
        }
        if (CurrentArray.length > 0)
          CurrentArray = manipulatePrevStepArray(
            CurrentArray,
            that.StepCounter - 1,
            tmpId
          );
        var showPrevArray = ["Isq", "RequirementDtl"];
        if (isSet(CurrentArray)) {
          for (var i = 0; i < CurrentArray.length; i++) {
            if (isSet(ConstructorName(CurrentArray[i].Obj))) {
              for (var j = 0; j < showPrevArray.length; j++) {
                if (
                  ConstructorName(CurrentArray[i].Obj).toLowerCase() ===
                  showPrevArray[j].toLowerCase()
                )
                  return true;
              }
            }
          }
          return false;
        }
        return false;
      }
      return false;
    }
  }
  
  function manipulatePrevStepArray(CurrentArray, step, tmpId) {
    var rejectarr = ["isqsp", "contactdetail", "userlogin", "userverification"];
    var arr = [];
    var len = CurrentArray.length;
    if (
      isSet(ReqObj.Form[tmpId].calledClassName[step]) &&
      ReqObj.Form[tmpId].calledClassName[step] !== ""
    ) {
      for (var i = 0; i < len; i++) {
        if (
          $.inArray(
            ReqObj.Form[tmpId].calledClassName[step].toLowerCase(),
            rejectarr
          ) !== -1
        ) {
          continue;
        } else {
          arr.push(CurrentArray[i]);
        }
      }
      return arr;
    } else return [];
  }
  
  function modificationOnBack(tmpId) {
    if (
      isSet($("#t" + tmpId + "_cname_ocbx").val()) &&
      $("#t" + tmpId + "_cname_ocbx").val() !== ""
    ) {
      $("#t" + tmpId + "ncbx").addClass("bedsnone");
      $("#t" + tmpId + "ocbx").removeClass("bedsnone");
    } else if (
      isSet($("#t" + tmpId + "_cname_ncbx").val()) &&
      $("#t" + tmpId + "_cname_ncbx").val() !== ""
    ) {
      $("#t" + tmpId + "ocbx").addClass("bedsnone");
      $("#t" + tmpId + "ncbx").removeClass("bedsnone");
    } else if (
      isSet($("#t" + tmpId + "_cname_ocbx").val()) &&
      $("#t" + tmpId + "_cname_ocbx").val() === "" &&
      isSet($("#t" + tmpId + "_cname_ncbx").val()) &&
      $("#t" + tmpId + "_cname_ncbx").val() === ""
    ) {
      $("#t" + tmpId + "ocbx").removeClass("bedsnone");
      $("#t" + tmpId + "ncbx").removeClass("bedsnone");
    }
    //   if(isSet($($('input[type=text].oldui')[0]).val()) && $($('input[type=text].oldui')[0]).val() !== ""){
    //     $($('input[type=text].newui')[0]).parent().addClass('bedsnone')
    //     $($('input[type=text].newui')[0]).parent().parent().addClass("bedsnone")
    //     $($('input[type=text].oldui')[0]).parent().removeClass('bedsnone')
    //   }
    //   else if (isSet($($('input[type=text].newui')[0]).val()) && $($('input[type=text].newui')[0]).val() !== ""){
    //     $($('input[type=text].oldui')[0]).parent().addClass('bedsnone')
    //     $($('input[type=text].newui')[0]).parent().removeClass('bedsnone')
    //     $($('input[type=text].newui')[0]).parent().parent().removeClass("bedsnone")
    //   }
    //   else if(isSet($($('input[type=text].oldui')[0]).val()) && $($('input[type=text].oldui')[0]).val() === "" && $($('input[type=text].newui')[0]).val() === "") {
    //     $($('input[type=text].oldui')[0]).parent().removeClass('bedsnone')
    //     $($('input[type=text].newui')[0]).parent().removeClass('bedsnone')
    //     $($('input[type=text].newui')[0]).parent().parent().removeClass("bedsnone")
    //   }
  }
  
  function ButtonNameUI(currentScreen, tmpId, data) {
    var typeofform = ReqObj.Form[tmpId].typeofform.toLowerCase();
    var currentScreen = currentScreen.toLowerCase();
    handleSubmitButton(
      getBtnObject(typeofform, tmpId, currentScreen),
      tmpId,
      data
    );
  }
  
  function getBtnObject(typeofform, tmpId, currentScreen) {
    var btnObj =
      ReqObj.Form[tmpId].FormSequence.StepCounter === 0
        ? stepOneButton(typeofform, tmpId, currentScreen)
        : stepNextButton(typeofform, tmpId, currentScreen);
    return btnObj;
  }
  
  function stepOneButton(typeofform, tmpId, currentScreen) {
    var btnObj = "";
    var btncls = isGDPRCountry() ? "befstbtn2 hovsub" : "befstgo2 hovsub";
    var imeshcookie = imeshExist();
    if (
      tmpId.substr(0, 2) === "04" &&
      typeofform === "bl" &&
      new RegExp("penqbt").test($("#t" + tmpId + "_submit").attr("class")) &&
      ReqObj.Form[tmpId].FormSequence._stepCounter < 1
    ) {
      btnObj = {
        buttonText: "Submit Requirement",
        buttonCls: "penqbt",
        parentCls: "betxtc",
      };
    } else if (tmpId.substring(0, 2) === "09") {
      if (isImageVidEnq(tmpId)) {
        if (isEcomProduct(tmpId)) {
          btnObj = {
            buttonText: "Buy Now",
            buttonCls: "befstgo2 hovsub befwt",
            parentCls: "",
          };
        } else if (
          ReqObj.Form[tmpId].FormSequence._stepCounter === 0 &&
          imeshcookie !== "" &&
          currentScreen === "enquirenow"
        ) {
          btnObj = {
            buttonText: "Enquire Now",
            buttonCls: "befstgo2 hovsub befwt",
            parentCls: pdpenqImage(tmpId) ? "txt-cnt" : (direnqImage(tmpId)? "sixcen btmarg":   ""),
          };
        } else if (imeshcookie === "") {
          btnObj = {
            buttonText: "Contact Supplier",
            buttonCls: "befstgo2 hovsub befwt",
            parentCls: direnqImage(tmpId)?"sixcen btmarg":"eqimgvidmt",
          };
        } else {
          btnObj = {
            buttonText: "Submit",
            buttonCls: btncls + " hovsub befwt",
            parentCls: direnqImage(tmpId)?"sixcen btmarg":"",
          };
        }
      } else {
        btnObj = restScreensButton(typeofform, tmpId, currentScreen); // rest screens
      }
    } else if (typeofform === "popupchatbl") {
      btnObj = {
        buttonText: "",
        buttonCls: "cbl_sbmtbt cbl_pa cbl_cp",
        parentCls: "cbl_sbmt_btn cbl_pr cbl_zi3",
      };
    } else if (isSSB(tmpId)) {
      if (isnewSSB(tmpId)) {
        btnObj = {
          buttonText: "Get Quotes from Sellers",
          buttonCls: "nb-btmm",
          parentCls: "nb-dib nb-btmim",
        };
      } else
        btnObj = {
          buttonText: "Get Quotes from Sellers",
          buttonCls: "mb-btmm",
          parentCls: "mb-dib mb-btmim",
        };
    } else {
      var sticky = isSticky(tmpId) ? "FM_be_btmm" : "be_btmm";
      var buttonCls =
        (isGlIdEven(tmpId) &&
          tmpId.substr(0, 2) === "01" &&
          ReqObj.Form[tmpId].screenNumber === 0) ||
        isBlInline(tmpId)
          ? isBlInlineFr(tmpId)
            ? "fAdsb"
            : "inSbtn crP"
          : isSet(ReqObj.Form[tmpId].changeUICTA) &&
            ReqObj.Form[tmpId].changeUICTA !== ""
          ? sticky + " hovsub pdgbt"
          : sticky + " hovsub";
      btnObj = {
        buttonText: "Submit Requirement",
        buttonCls: buttonCls, //adwords_ch
        parentCls:
          (isGlIdEven(tmpId) &&
            tmpId.substr(0, 2) === "01" &&
            ReqObj.Form[tmpId].screenNumber === 0) ||
          isBlInline(tmpId)
            ? isBlInlineFr(tmpId)
              ? imeshExist() !== ""
                ? ReqObj.UserDetail["fn"] == ""
                  ? "ident"
                  : "adwIdn ident"
                : ""
              : "idsf iJFnd"
            : "be-mdl", //switch_ch
      }; // inline first step
    }
    if (
      !isSSB(tmpId) &&
      currentISO() !== "IN" &&
      ("contactdetail" === currentScreen ||
        ("moredetails" === currentScreen && typeofform === "bl"))
    ) {
      btnObj = stepNextButton(typeofform, tmpId, currentScreen);
    }
    return btnObj;
  }
  
  function stepNextButton(typeofform, tmpId, currentScreen) {
    var btnObj = restScreensButton(typeofform, tmpId, currentScreen); //rest screens
    backButtonNameUI(tmpId);
    return btnObj;
  }
  
  function restScreensButton(typeofform, tmpId, currentScreen) {
    var btnObj = "";
    var imeshCookie = imeshExist();
    var iso = currentISO();
    if (
      checkblockedUser() &&
      new RegExp("userverification").test(currentScreen)
    ) {
      btnObj =
        typeofform === "bl"
          ? {
              buttonText: "Submit",
              buttonCls: "blotpbtn hovsub",
              parentCls: "befstgo3",
            }
          : { buttonText: "Submit", buttonCls: "befstgo3 hovsub", parentCls: "" };
    } else if (imeshCookie === "") {
      var btncls = isGDPRCountry() ? "befstbtn2 hovsub" : "befstgo2 hovsub";
      var bfstgo = pdpInactiveBL(tmpId)?(iso=="IN")?"befstgobl":"bfstgobl":(iso=="IN")?"befstgo":"befstgo1";
      var bfsbtnbl = pdpInactiveBL(tmpId)? "bfsbtnbl hovsub" : "befstbtn hovsub";
      var valuebtn = pdpInactiveBL(tmpId)? "Continue" : "Go";
      var gobtn =pdpInactiveBL(tmpId) ? " gobtn": "";
      btnObj =
        typeofform === "bl"
          ? iso === "IN"
            ? {
                buttonText: "Go",
                buttonCls: "befstbtn hovsub" + gobtn,
                parentCls: bfstgo,
              }
            : {
                buttonText: valuebtn,
                buttonCls: bfsbtnbl,
                parentCls: bfstgo,
              }
          : {
              buttonText: "Submit",
              buttonCls: btncls + " hovsub",
              parentCls: "",
            }; //login
    } else {
      if (
        new RegExp("contactdetail").test(currentScreen) ||
        new RegExp("productname").test(currentScreen) ||
        currentScreen === "moredetails" ||
        new RegExp("moredetails").test(currentScreen)
      ) {
          var mt0 = pdpInactiveBL(tmpId) ? (new RegExp("moredetails").test(currentScreen) || (new RegExp("contactdetail").test(currentScreen) && ReqObj.Form[tmpId].FormSequence._screenCounter > 0) ) ? " mt20" : " bemt0":"";
          var btn_cls = pdpInactiveBL(tmpId) && currentISO()=="IN" ? " blbtn" : "";
          btnObj =
            typeofform === "bl"
              ? {
                  buttonText: "Submit",
                  buttonCls: "form-btn hovsub" + btn_cls,
                  parentCls: "befstgo2" + mt0,
                }
              : {
                  buttonText: "Submit",
                  buttonCls: " befstgo2 hovsub",
                  parentCls: "",
                }; // contact
      }
  
      if (new RegExp("userverification").test(currentScreen)) {
        btnObj =
          typeofform === "bl"
            ? {
                buttonText: "Submit",
                buttonCls: "blotpbtn hovsub",
                parentCls: "befstgo3",
              }
            : {
                buttonText: "Submit",
                buttonCls: "befstgo3 hovsub ",
                parentCls: "",
              }; // otp
      }
      if (
        new RegExp("isq").test(currentScreen) ||
        currentScreen === "isq" ||
        currentScreen === "isqrequirementdtl" ||
        currentScreen === "requirementdtl" ||
        currentScreen === "staticques" ||
        currentScreen === "requirementdtlblstaticques" ||
        currentScreen === "blstaticques" ||
        currentScreen === "moredetailsblstaticques" ||
        currentScreen === "requirementdtlmoredetails" ||
        currentScreen === "isqrequirementdtlmoredetails" ||
        currentScreen === "moredetailsblstaticques" ||
        currentScreen === "requirementdtlmoredetailsblstaticques" ||
        currentScreen === "isqmoredetails"
      ) {
          var mt0 = pdpInactiveBL(tmpId)? (new RegExp("blstaticques").test(currentScreen)  ) ? "mt20" : "mt2" : "";
          var btn_cls = pdpInactiveBL(tmpId) && currentISO()=="IN" ? " blbtn" : "";
        btnObj =
          typeofform === "bl"
            ? {
                buttonText: "Next",
                buttonCls:
                  isGlIdEven(tmpId) && tmpId.substr(0, 2) === "01"
                    ? "form-btn hovsub mbl15_0"
                    : "form-btn hovsub" + btn_cls,
                parentCls: "befstgo2 " + mt0,
              }
            : { buttonText: "Next", buttonCls: "befstgo2 hovsub", parentCls: "" }; // isq/enrich
      }
    }
    if (isImageVidEnq(tmpId)) btnObj.buttonCls += direnqImage(tmpId)?" btmarg befwt": " befwt";
    return btnObj;
  }
  
  //switch_ch
  function identAppend(flagIdent) {
    if (typeof appendUtmParamPhase1 == "function") {
      appendUtmParamPhase1(flagIdent);
    } else {
      setTimeout(function () {
        identAppend(flagIdent);
      }, 500);
    }
  }
  
  function handleSubmitButton(btnObj, tmpId, data) {
    if (!IsChatbl(tmpId)) {
      //adwords_ch
      if (isBlInlineFr(tmpId) && imeshExist() === "" && isGDPRCountry()) {
        if (
          $("#t" + tmpId + "_submit")
            .parent()
            .hasClass("fpr10")
        ) {
          $("#t" + tmpId + "_submit")
            .prop("value", btnObj.buttonText)
            .addClass(btnObj.buttonCls)
            .parent()
            .addClass(btnObj.parentCls);
        } else {
          $("#t" + tmpId + "_submit")
            .parent()
            .addClass("w50 fpr10");
          $("#t" + tmpId + "_submit")
            .closest(".iJSpb")
            .removeClass("ngdpr");
        }
      } else if (isBlInlineFr(tmpId) && imeshExist() !== "" && isGDPRCountry()) {
        $("#t" + tmpId + "_submit")
          .prop("value", btnObj.buttonText)
          .removeClass()
          .addClass(btnObj.buttonCls)
          .parent()
          .removeClass()
          .addClass(btnObj.parentCls);
  
        if (
          !$("#t" + tmpId + "_submit")
            .closest(".iJSpb")
            .hasClass("ngdpr")
        ) {
          $("#t" + tmpId + "_submit")
            .closest(".iJSpb")
            .addClass("ngdpr");
        }
      } else if (isBlInlineFr(tmpId) && imeshExist() === "" && !isGDPRCountry()) {
        $("#t" + tmpId + "_submit")
          .prop("value", btnObj.buttonText)
          .removeClass()
          .addClass(btnObj.buttonCls)
          .parent()
          .removeClass()
          .addClass(btnObj.parentCls);
  
        if (
          !$("#t" + tmpId + "_submit")
            .closest(".iJSpb")
            .hasClass("ngdpr")
        ) {
          $("#t" + tmpId + "_submit")
            .closest(".iJSpb")
            .addClass("ngdpr");
        }
      } else {
        $("#t" + tmpId + "_submit")
          .prop("value", btnObj.buttonText)
          .removeClass()
          .addClass(btnObj.buttonCls)
          .parent()
          .removeClass()
          .addClass(btnObj.parentCls);
      }
  
      //switch_ch     //adwords caching issue
      if (
        isBlInlineFr(tmpId) &&
        (btnObj.parentCls === "ident" || btnObj.parentCls === "adwIdn ident")
      ) {
        var mcatView = 0;
        if (
          typeof ims !== "undefined" &&
          isSet(ims) &&
          isSet(ims.mcatid) &&
          ims.mcatid !== ""
        ) {
          mcatView =
            ims.mcatid == "145350" ||
            ims.mcatid == "145513" ||
            ims.mcatid == "113951" ||
            ims.mcatid == "15607"
              ? 1
              : 0;
        }
  
        if (mcatView === 1) {
          var defaultView = "list";
          if (
            typeof ims !== "undefined" &&
            isSet(ims) &&
            isSet(ims.catGridLabel) &&
            ims.catGridLabel !== ""
          ) {
            defaultView = ims.catGridLabel === "0" ? "list" : "grid";
          }
  
          var pageView = defaultView;
          if (
            typeof ims !== "undefined" &&
            isSet(ims) &&
            isSet(ims.pageViewStatus) &&
            ims.pageViewStatus !== ""
          ) {
            pageView = ims.pageViewStatus === "grid" ? "grid" : "list";
          }
  
          //defaultview===list
          if (defaultView === "list") {
            if (pageView === "list") {
              //getting identified on list page
  
              //update url of switched page
              var switchUrl = $(".dspVew")[1].getAttribute("href");
              var identPresent = switchUrl.indexOf("&ident=1") === -1 ? 0 : 1;
              if (!identPresent) {
                var part2 = "&grid_view=1";
                var part1 = switchUrl.substring(0, switchUrl.lastIndexOf(part2));
                $(".dspVew")[1].setAttribute("href", part1 + "&ident=1" + part2);
                // var flagIdent=1;
                // identAppend(flagIdent);
              }
  
              //update url of current page
              var currentUrl = window.location.href;
              var identPresent = currentUrl.indexOf("&ident=1") === -1 ? 0 : 1;
              if (!identPresent) {
                newUrl = currentUrl + "&ident=1";
                history.replaceState(null, "", newUrl);
                var flagIdent = 1;
                identAppend(flagIdent);
              }
            } else {
              //getting identified on grid page
  
              //update url of switched page
              var switchUrl = $(".dspVew")[1].getAttribute("href");
              var identPresent = switchUrl.indexOf("&ident=1") === -1 ? 0 : 1;
              if (!identPresent) {
                $(".dspVew")[1].setAttribute("href", switchUrl + "&ident=1");
                // var flagIdent=1;
                // identAppend(flagIdent);
              }
  
              //update url of current page
              var currentUrl = window.location.href;
              var identPresent = currentUrl.indexOf("&ident=1") === -1 ? 0 : 1;
              if (!identPresent) {
                var part2 = "&grid_view=1";
                var part1 = currentUrl.substring(
                  0,
                  currentUrl.lastIndexOf(part2)
                );
                newUrl = part1 + "&ident=1" + part2;
                history.replaceState(null, "", newUrl);
                var flagIdent = 1;
                identAppend(flagIdent);
              }
            }
          }
  
          //defaultview===grid
          else {
            if (pageView === "grid") {
              //getting identified on grid page
  
              //update url of switched page
              var switchUrl = $(".dspVew")[1].getAttribute("href");
              var identPresent = switchUrl.indexOf("&ident=1") === -1 ? 0 : 1;
              if (!identPresent) {
                var part2 = "&list_view=1";
                var part1 = switchUrl.substring(0, switchUrl.lastIndexOf(part2));
                $(".dspVew")[1].setAttribute("href", part1 + "&ident=1" + part2);
                // var flagIdent=1;
                // identAppend(flagIdent);
              }
  
              //update url of current page
              var currentUrl = window.location.href;
              var identPresent = currentUrl.indexOf("&ident=1") === -1 ? 0 : 1;
              if (!identPresent) {
                newUrl = currentUrl + "&ident=1";
                history.replaceState(null, "", newUrl);
                var flagIdent = 1;
                identAppend(flagIdent);
              }
            } else {
              //getting identified on list page
  
              //update url of switched page
              var switchUrl = $(".dspVew")[1].getAttribute("href");
              var identPresent = switchUrl.indexOf("&ident=1") === -1 ? 0 : 1;
              if (!identPresent) {
                $(".dspVew")[1].setAttribute("href", switchUrl + "&ident=1");
                // var flagIdent=1;
                // identAppend(flagIdent);
              }
  
              //update url of current page
              var currentUrl = window.location.href;
              var identPresent = currentUrl.indexOf("&ident=1") === -1 ? 0 : 1;
              if (!identPresent) {
                var part2 = "&list_view=1";
                var part1 = currentUrl.substring(
                  0,
                  currentUrl.lastIndexOf(part2)
                );
                newUrl = part1 + "&ident=1" + part2;
                history.replaceState(null, "", newUrl);
                var flagIdent = 1;
                identAppend(flagIdent);
              }
            }
          }
        }
      }
  
      if (
        !(IsChatbl(tmpId) || isSSB(tmpId) || (isBl(tmpId) && !Bl09(tmpId))) &&
        currentISO() !== "IN" &&
        imeshExist() === ""
      )
        $("#t" + tmpId + "_submit")
          .parent()
          .addClass("txt-cnt");
      onHovSub(tmpId);
      backButtonNameUI(tmpId, data);
    }
  }
  
  function backButtonNameUI(tmpId, data) {
    var nobackbtn = isSet(data) && isSet(data.showBackBtn) ? data.showBackBtn : 1;
    if (
      nobackbtn === 1 &&
      isOtherEnq(tmpId) &&
      imeshExist() !== "" &&
      IsPrevStepAvailable(tmpId)
    ) {
      $("#t" + tmpId + "_backdiv").removeClass("bedsnone");
      $("#t" + tmpId + "_fBtn").addClass("eqBksb");
      $("#t" + tmpId + "_submitdiv").addClass("eqBsub");
    } else {
      $("#t" + tmpId + "_fBtn").removeClass("eqBksb");
      $("#t" + tmpId + "_submitdiv").removeClass("eqBsub");
      $("#t" + tmpId + "_backdiv").addClass("bedsnone");
    }
  }
  
  function MoreDetailService(tmpId, which) {
    var data = ContactDetail.prototype.getData(tmpId, which);
    if (
      (isEnq(tmpId) || isBl(tmpId)) &&
      currentISO() === "IN" &&
      which.toLowerCase() !== "gst"
    ) {
      if (ReqObj.Form[tmpId].gst.number) {
        var _data = ContactDetail.prototype.multipleHitCases(
          data,
          "again",
          "notgst"
        );
      } else var _data = ContactDetail.prototype.multipleHitCases(data);
      data = _data.data;
    } else if (
      (isEnq(tmpId) || isBl(tmpId)) &&
      currentISO() === "IN" &&
      which.toLowerCase() === "gst"
    ) {
      var _data = ContactDetail.prototype.multipleHitCases(data);
      data = _data.data;
    } else if (
      (isEnq(tmpId) || isBl(tmpId)) &&
      currentISO() !== "IN" &&
      which.toLowerCase() !== "url"
    ) {
      if (ReqObj.Form[tmpId].url.name) {
        which = which + "URL";
        var _data = ContactDetail.prototype.multipleHitCases(
          data,
          "noturl",
          "no"
        );
      } else var _data = ContactDetail.prototype.multipleHitCases(data);
      data = _data.data;
    } else if (
      (isEnq(tmpId) || isBl(tmpId)) &&
      currentISO() !== "IN" &&
      which.toLowerCase() === "url"
    ) {
      var _data = ContactDetail.prototype.multipleHitCases(data, "url", "no");
      data = _data.data;
    } else data = data;
  
    data["replica"] = "";
    data["scrnNm"] =
      currentISO() === "IN"
        ? which + "Desktop Enquiry/BL Forms"
        : which + "Desktop Enquiry/BL Forms Foreign";
    data = ObjectTrim(data);
    fireAjaxRequest({
      data: {
        ga: {
          s: true,
          f: true,
          gatype: which + "Service",
          source: "",
        },
        tmpId: tmpId,
        ajaxObj: {
          obj: "",
          s: {
            ss: 0,
            sf: {
              af: 0,
              pa: 0,
            },
            f: 0,
          },
          f: {
            f: 0,
          },
        },
        ajaxtimeout: 0,
        ajaxdata: data,
        hitfinserv: "",
        type: 6,
        typename: which,
      },
    });
    if (
      (isEnq(tmpId) || isBl(tmpId)) &&
      currentISO() === "IN" &&
      _data.hitagain === true
    ) {
      MoreDetailService(tmpId, "GST");
    } else if (
      (isEnq(tmpId) || isBl(tmpId)) &&
      currentISO() !== "IN" &&
      _data.hitagain === true
    ) {
      MoreDetailService(tmpId, "URL");
    }
  }  
  function returnPostBlEnqObject(tmpId, array, hooks, that, ns) {
    return {
      object: {
        obj: new PostBlEnqUpdate(tmpId),
        toReplace: false,
        isService: true,
        array: array,
        hooks: hooks,
      },
      tmpId: tmpId,
      that: that,
      AfterService: [],
      hasFallback: false,
      FallbackObj: null,
      nextStep: ns,
    };
  }
  
  function returnGenObject(tmpId, array, hooks, that, type) {
    return {
      object: {
        obj: new Generation(type),
        toReplace: true,
        isService: true,
        array: array,
        hooks: hooks,
      },
      tmpId: tmpId,
      that: that,
      AfterService: [],
      hasFallback: false,
      FallbackObj: null,
    };
  }
  
  function returnmdtlObject(array, hooks, tmpId, that, countlastUpdated, md) {
    var Obj = {
      object: {
        obj: new MoreDetails(tmpId),
        toReplace: false,
        isService: false,
        array: array,
        hooks: hooks,
        countlastUpdated: countlastUpdated,
      },
      tmpId: tmpId,
      that: that,
      AfterService: [],
      hasFallback: false,
      FallbackObj: null,
      md: md,
    };
    return Obj;
  }
  
  function toAskMoreDetails(tmpId) {
    var cn = cNameConditions(tmpId);
    var gst = gstConditions(tmpId);
    if (cn === true) return { ask: true, what: "Company Name", key: 0 };
    else if (gst === true) return { ask: true, what: "GST Number", key: 1 };
    return { ask: false, what: "", key: -1 };
  }
  
  function onURLName(tmpId) {
    var url =
      urlConditions(tmpId).ask === false &&
      typeof ReqObj.UserDetail.isurl === "undefined"
        ? true
        : urlConditions(tmpId).ask;
    if (
      imeshExist() !== "" &&
      url &&
      (ReqObj.miniDetailHit.ping === false ||
        ReqObj.miniDetailHit.reply.success === true)
    ) {
      $("#t" + tmpId + "_cdiv").append(
        mdtlHtml(tmpId, 0, { ask: true, what: "URL", key: 2 })
      );
      ReqObj.Form[tmpId].url.html = true;
    }
  }
  
  function onCName(tmpId, callFromEvent) {
    if (
      ((tmpId.substring(0, 2) === "09" &&
        ReqObj.Form[tmpId].formType.toLowerCase() === "enq") ||
        isSSB(tmpId)) &&
      $("#t" + tmpId + "_cbx").length === 0
    ) {
      if (cNameConditions(tmpId)) {
        if ($("#t" + tmpId + "_cdiv").length !== 0) {
          if (
            (isSSB(tmpId) &&
              (ReqObj.miniDetailHit.ping === false ||
                ReqObj.miniDetailHit.reply.success === true)) ||
            !isSSB(tmpId)
          )
            $("#t" + tmpId + "_cdiv").html(
              mdtlHtml(tmpId, 0, { ask: true, what: "Company Name", key: 0 })
            );
          (isSSB(tmpId) && isnewSSB(tmpId)) || isEnq(tmpId)
            ? ""
            : manipulateWidth(tmpId, ReqObj.Form[tmpId].cName.cnameId);
          if (
            isEnq(tmpId) &&
            $("#t" + tmpId + "_reqbox").length > 0 &&
            currentISO() !== "IN"
          )
            manipulateWidth(tmpId, ReqObj.Form[tmpId].cName.cnameId);
          ReqObj.Form[tmpId].cName.fs = true;
          ReqObj.Form[tmpId].cName.cdiv = true;
        }
      } else {
        if (
          callFromEvent === true &&
          ReqObj.UserDetail.cName === "" &&
          (ReqObj.Form[tmpId].cName.tov1 === true ||
            ReqObj.Form[tmpId].cName.rb === true)
        ) {
        } else {
          $("#t" + tmpId + "_cdiv").html("");
          ReqObj.Form[tmpId].cName.fs = false;
          ReqObj.Form[tmpId].cName.cdiv = false;
        }
      }
    } else if (
      tmpId.substring(0, 2) === "09" &&
      ReqObj.Form[tmpId].formType.toLowerCase() === "enq"
    ) {
      if (
        $("#t" + tmpId + "_cbx").length === 1 &&
        !cNameConditions(tmpId) &&
        !cNameIsq(tmpId)
      ) {
        ReqObj.Form[tmpId].cName.isShown = false;
        $("#t" + tmpId + "_cbx").addClass("bedsnone");
      } else {
        ReqObj.Form[tmpId].cName.isShown = true;
        $("#t" + tmpId + "_cbx").removeClass("bedsnone");
      }
    }
  }
  function mdtlError(tmpId, id, md) {
    var html = "";
    var cls =
      (isOtherEnq(tmpId) && tmpId.substring(0, 2) === "09") ||
      (isOtherEnq(tmpId) && ReqObj.Form[tmpId].FormSequence.StepCounter > 0)
        ? "be-erbx beerrp bedsnone"
        : isSSB(tmpId)
        ? "mb-ertxt mb-mt10 bedsnone"
        : "be-erbx bedsnone";
    html = returnContainer("t" + tmpId, "_mdtlerror_" + md.suffix, cls, "", "");
    html += returnContainer("t" + tmpId, id + "_errmsg", "", "content", "");
    html += "</div >";
    html =
      (isOtherEnq(tmpId) && tmpId.substring(0, 2) === "09") ||
      (isOtherEnq(tmpId) && ReqObj.Form[tmpId].FormSequence.StepCounter > 0) ||
      isSSB(tmpId)
        ? html
        : html + '<a class="be-erarw" data-role="arrow"></a>';
    html += "</div >";
    return html;
  }
  
  function cnameTooltip(tmpId, outerid) {
    var cls =
      isMoglixUi(tmpId) && outerid == "_company_ncbx"
        ? "int-ct3 info_iconeqbl Tleft"
        : "int-ct3 info_iconeqbl";
    return (
      '<div class="' +
      cls +
      '"> <div class="blnewform_sprit inft bepr inth inftIcn" style="position: relative!important;"> <div class="inthDtl dn beabult"> <p class>Make sure your company name:</p><ul> <li>is longer than 4 characters</li><li>is not the name of contact person</li><li>is not the name of product you sell</li><li>is not generic e.g. \'textile\',\'SEO services\', \'travel agency\' </li></ul> </div></div></div>'
    );
  }
  
  function mdtlHtml(tmpId, todo, md) {
    var oldui = (isEnq(tmpId) || isBl(tmpId)) && md.ui === "old" ? true : false;
    var ui = mdtlUI(tmpId, md, oldui);
    var err = md.key === 2 || md.key === 0 ? mdtlError(tmpId, ui.id, md) : "";
    var cls = IsChatbl(tmpId)
      ? "cpNm cbl_txt"
      : isEnq(tmpId) && oldui === false
      ? "be-slbox inpt_errorbx inPlace mdplc"
      : "cpNm";
    if (oldui === true) cls += " oldui";
    else cls += " newui";
    if(pdpInactiveBL(tmpId)) cls += " cbl_br10";
    ui.placeholder = isEnq(tmpId) && oldui === false ? "" : ui.placeholder;
    var inp = returnInput(
      "t" + tmpId,
      ui.id,
      "text",
      ui.id,
      ui.placeholder,
      cls,
      "",
      ui.insty,
      ui.maxlength,
      ""
    );
    var htmlobj = {
      OuterWrapper:
        "<div id='t" + tmpId + ui.outerid + "' class='" + ui.dvc + "'>",
      Label:
        "<label id='t" +
        tmpId +
        ui.outerid +
        "_lbl' style='" +
        ui.lbls +
        "' class='" +
        ui.lblc +
        "'>" +
        ui.lbtxt +
        "</label>",
      UserInput: isSSB(tmpId)
        ? isnewSSB(tmpId)
          ? inp + err
          : "<div class='mb-InCon'>" + inp + err + "</div>"
        : isBlInline(tmpId)
        ? "<div class='pflx1'>" + inp + err + "</div>"
        : IsChatbl(tmpId)
        ? inp + skipDiv1(tmpId)
        : inp + err, //chat bl bug
      ClosingWrapper: "</div>",
      Tooltip: cnameTooltip(tmpId, ui.outerid),
    };
    if (md.key === 0 && !IsChatbl(tmpId)) {
      htmlobj.Label =
        !oldui && isEnq(tmpId)
          ? htmlobj.Label
          : "<div class='cbl_df'>" + htmlobj.Label + htmlobj.Tooltip + "</div>";
      htmlobj.ClosingWrapper += !oldui && isEnq(tmpId) ? htmlobj.Tooltip : "";
    }
    var html =
      htmlobj.OuterWrapper +
      htmlobj.Label +
      htmlobj.UserInput +
      htmlobj.ClosingWrapper;
    if (md.key === 0) ReqObj.Form[tmpId].cName.chtml = true;
    if (md.key === 1) ReqObj.Form[tmpId].gst.html = true;
    return todo === 1 ? htmlobj : html;
  }
  
  function mdtlUI(tmpId, md, oldui) {
    var lblr =
      ReqObj.Form[tmpId].formType.toLowerCase() === "enq"
        ? isMoglixUi(tmpId)
          ? ""
          : pdpenqImage(tmpId)
          ? "color:#05796F"
          : "color:#111"
        : "color:#696969";
    var ins =
      ReqObj.Form[tmpId].formType.toLowerCase() === "bl"
        ? ""
        : "border-radius: 7px;";
    var mdtext =
      md.key === 1
        ? "GST Number"
        : md.key === 2
        ? "Website URL"
        : "Company/ Business Name";
    if (md.key === 0) ReqObj.Form[tmpId].cName["cnameId"] = "_cname_" + md.suffix;
    return {
      id:
        md.key === 0
          ? "_cname_" + md.suffix
          : md.key === 1
          ? "_gstname"
          : "_urlname",
      outerid:
        md.key === 0 ? "_company_" + md.suffix : md.key === 1 ? "_gst" : "_url",
      placeholder:
        md.key === 2
          ? "Eg: www.johnenterprise.com"
          : md.key === 0
          ? IsChatBLInline(tmpId) || pdpenqImage(tmpId)
            ? "Eg: Suguna Foods Private Limited"
            : "Eg: John Enterprises, Suguna Foods Private Limited"
          : IsChatbl(tmpId)
          ? "Please enter your " + mdtext
          : (md.key === 2 &&
              ReqObj.Form[tmpId].formType.toLowerCase() === "bl") ||
            md.key === 1
          ? "Please enter " + mdtext + " to reach more sellers"
          : "Please enter your " + mdtext,
      lbtxt: IsChatbl(tmpId)
        ? md.key === 0
          ? "Please provide your <span class='befwt'>Company/ Business Name</span> to get quick response from the supplier"
          : "Please enter <span class='befwt'>" +
            mdtext +
            "</span> to get quick response from the supplier"
        : md.key === 0
        ? "Company/ Business Name"
        : mdtext,
      dvc: isSSB(tmpId)
        ? isnewSSB(tmpId)
          ? "nb-frm nb-mt25"
          : "mb-flex mb-fxstrt mb-pdt15"
        : isBlInline(tmpId)
        ? "idsf pfstrt mb20"
        : isEnq(tmpId) && oldui === false
        ? isMoglixUi(tmpId)
          ? "eqflot beW5 bemt10 pr"
          : pdpenqImage(tmpId)
          ? "eqflot eCwd"
          : "eqflot beW5"
        : isMoglixUi(tmpId)
        ? "bemt10 pr"
        : pdpenqImage(tmpId)
        ? "bemt10 pr eCnm"
        : "bemt10",
      lblc: isSSB(tmpId)
        ? isnewSSB(tmpId)
          ? "nb-fmlbl"
          : "mb-lbl"
        : isBlInline(tmpId)
        ? "fs15 cl11"
        : isEnq(tmpId) && oldui === false
        ? "be-lbl"
        : "",
      lbls:
        isSSB(tmpId) ||
        isBlInline(tmpId) ||
        IsChatbl(tmpId) ||
        (isEnq(tmpId) && oldui === false)
          ? ""
          : "padding: 12px 0px 9px 0px;font-size: 15px;" +
            lblr +
            ";pointer-events: none;line-height:14px;display: block;",
      insty:
        isSSB(tmpId) || (isEnq(tmpId) && oldui === false)
          ? ""
          : IsChatbl(tmpId)
          ? "width:100%;max-width:100%"
          : "height:42px;vertical-align:top;padding:0px 0 0 8px;font-size: 15px;border:1px solid #c9c6c6;background-color:#fff;color: #000;box-sizing:border-box;width: 50%" +
            ins,
      maxlength: md.key === 1 ? "15" : "",
    };
  }
  
  function manipulateWidth(tmpId, id) {
    var siblingElement =
      $("#t" + tmpId + "_cdiv").html() !== "" &&
      $("#t" + tmpId + "_cdiv").html() !== null
        ? $("#t" + tmpId + "_cdiv")
        : $("#t" + tmpId + "_cbx");
    var arr = siblingElement.siblings();
    var len = arr.length;
    var widthSet = false;
    if (len === 0) {
      $("#t" + tmpId + id).width("60%");
      widthSet = true;
    }
    if (
      isSet($(".newui")) &&
      len === 0 &&
      isSet($(".newui").parent().attr("id")) &&
      isBl($(".newui").parent().attr("id").substr(1, 4))
    ) {
      $(".newui").width("60%");
      widthSet = true;
    } else {
      for (var i = len - 1; i >= 0; i--) {
        if (
          $("#" + arr[i].id).html() !== "" &&
          arr[i].id === "t" + tmpId + "_reqbox"
        ) {
          widthSet = true;
          if ($("#t" + tmpId + "_reqBoxTemplates").outerWidth() <= 100)
            $("#t" + tmpId + id).width("86%");
          else
            $("#t" + tmpId + id).width(
              $("#t" + tmpId + "_reqBoxTemplates").outerWidth()
            );
          break;
        }
      }
    }
    if (widthSet === false) $("#t" + tmpId + id).width("60%");
  }
  
  
  /*------------------Contact-Detail--------------------------*/
  
  function ContactDetail(name, email, city) {
    this.setName = "";
    this.setEmail = "";
    this.setCity = "";
    this.setMobile = "";
  
    this.imeshCookie = "";
    this.iplocCookie = "";
  
    this.usercountry = "";
    this.geoip_country_iso = "";
  
    this.name = name;
    this.email = email;
    this.city = city;
    this.shownHtml = [];
    this.contactdetailhtml = "";
    this.className = "ContactDetail";
  
    this.ContactDetailHtmlNameObj = {
      Label: "",
      UserInput: "",
      OuterWrapper: "",
      ClosingWrapper: "",
    };
    this.ContactDetailHtmlEmailObj = {
      Label: "",
      UserInput: "",
      OuterWrapper: "",
      ClosingWrapper: "",
    };
    this.ContactDetailHtmlCityObj = {
      Label: "",
      UserInput: "",
      OuterWrapper: "",
      ClosingWrapper: "",
    };
    this.ContactDetailHtmlObjArray = [];
    this.nonMandatory = false;
    this.classCount = 0;
    this.templateId = "";
    this.phonecalled = false;
  }
  
  ContactDetail.prototype.getClassCount = function (tmpId) {
    if ($.isEmptyObject(ReqObj.Form[tmpId].ContactDetail)) this.classCount = 1;
    else this.classCount = returnObjectSize(ReqObj.Form[tmpId].ContactDetail) + 1;
    ReqObj.Form[tmpId].nec.classCount = this.classCount;
  };
  
  ContactDetail.prototype.returnKey = function (tmpId) {
    var key = "";
    if (this.name === 1 && this.email === 0 && this.city === 0) {
      key = "Name";
    }
    if (this.name === 0 && this.email === 1 && this.city === 0) {
      if (currentISO() === "IN") {
        key = "Email";
      } else {
        key = "Mobile";
      }
    }
    if (this.name === 0 && this.email === 0 && this.city === 1) {
      key = "City";
    }
    return key;
  };
  
  ContactDetail.prototype.displayAnswer = function (tmpId) {
    var key = this.returnKey(tmpId);
    var name = "";
  
    if (this.name === 1 && this.email === 0 && this.city === 0) {
      name = ReturnBlUserName(tmpId);
    }
    var classtotest = chatBlClass(tmpId, "right");
    var leftright = IsChatbl(tmpId) ? "cbl_ansr" : "";
    return [
      ConversationRightWrapper(tmpId, returnAnswer(tmpId, key), {
        classtotest: classtotest,
        leftright: leftright,
      }),
      name,
    ];
  };
  ContactDetail.prototype.SaveDetails = function (tmpId, event) {
    if (IsChatbl(tmpId) || isSSB(tmpId)) {
      ReqObj.Form[tmpId].UserInputs["Name"] = $(
        "#t" + tmpId + "_q_first_nm" + this.classCount
      ).val();
      ReqObj.Form[tmpId].UserInputs["Mobile"] = $(
        "#t" + tmpId + "_q_mobile_f" + this.classCount
      ).val();
      ReqObj.Form[tmpId].UserInputs["Email"] = $(
        "#t" + tmpId + "_q_email_in" + this.classCount
      ).val()
        ? $("#t" + tmpId + "_q_email_in" + this.classCount)
            .val()
            .trim()
        : "";
      ReqObj.Form[tmpId].UserInputs["City"] =
        isSet(ReqObj.Form[tmpId].UserInputs["City"]) &&
        ReqObj.Form[tmpId].UserInputs["City"] !== ""
          ? ReqObj.Form[tmpId].UserInputs["City"]
          : $("#t" + tmpId + "_q_city_oth" + this.classCount).val();
      IsChatBLInline(tmpId) &&
      isSet($("#t" + tmpId + "_q_city_oth" + this.classCount).val()) &&
      isSet($(".t0801_CitySuggestor"))
        ? $(".t0801_CitySuggestor").css("display", "none")
        : "";
      /* OptiNeeded-this change is not related to save details functions - write it in appropriate place */
    }
  };
  
  ContactDetail.prototype.displayHtml = function (tmpId) {
    this.templateId = tmpId;
    if (tmpId.substring(0, 2) === "09") {
      if (this.name === 1 && this.email === 1 && this.city === 1)
        ReqObj.Form[tmpId].flags.isNECShown = true;
    } else {
      if (this.name === 1 && this.email === 1 && this.city === 1)
        ReqObj.Form[tmpId].flags.isNECShown = true;
      else {
        ReqObj.Form[tmpId].flags.isNECShown = false;
      }
    }
    if (IsChatbl(tmpId)) {
      return [this.contactdetailLabelhtml, this.contactdetailInputhtml];
    }
    if (isOtherEnq(tmpId)) {
      ReqObj.Form[tmpId].calledClassName[
        ReqObj.Form[tmpId].FormSequence.StepCounter
      ] = this.className;
    }
    return [this.contactdetailhtml];
  };
  ContactDetail.prototype.addHtmlObjToArray = function (htmlObj) {
    if (isSet(htmlObj)) this.ContactDetailHtmlObjArray.push([htmlObj]);
  };
  ContactDetail.prototype.getContactDetailHtml = function (tmpId) {
    var changeiso = currentISO();
    if (
      this.imeshCookie &&
      this.name === 1 &&
      this.email === 1 &&
      this.city === 1
    ) {
      if (this.setName === "") this.addHtmlObjToArray(this.showName(tmpId));
      if (
        (this.setEmail === "" && changeiso === "IN") ||
        (this.setMobile === "" &&
          changeiso !== "IN" &&
          ReqObj.Form[tmpId].OnCloseStep === true &&
          !isEnq(tmpId)) ||
        (this.setMobile === "" && changeiso !== "IN" && isnewSSB(tmpId)) ||
        (this.setMobile === "" &&
          changeiso !== "IN" &&
          (isEnq(tmpId) || isBl(tmpId)))
      )
        this.addHtmlObjToArray(this.showEmailOrMobile(tmpId));
      if (
        ((isSet(changeiso) && changeiso === "IN") || this.usercountry === "IN") &&
        this.setCity === ""
      )
        this.addHtmlObjToArray(this.showCity(tmpId));
    } else if (this.name === 1 && this.email === 0 && this.city === 0) {
      if (this.setName === "") this.addHtmlObjToArray(this.showName(tmpId));
    } else if (this.email === 1 && this.name === 0 && this.city === 0) {
      this.addHtmlObjToArray(this.showEmailOrMobile(tmpId));
    } else if (this.email === 0 && this.name === 0 && this.city === 1) {
      if (changeiso === "IN") this.addHtmlObjToArray(this.showCity(tmpId));
    } else if (this.name === 1 && this.email === 1 && this.city === 1) {
      if (this.setName === "") this.addHtmlObjToArray(this.showName(tmpId));
      if (
        (this.setEmail === "" && changeiso === "IN") ||
        (this.setMobile === "" &&
          changeiso !== "IN" &&
          ReqObj.Form[tmpId].OnCloseStep === true &&
          !isEnq(tmpId)) ||
        isSSB(tmpId) ||
        (this.setMobile === "" &&
          changeiso !== "IN" &&
          (isEnq(tmpId) || isBl(tmpId)))
      )
        this.addHtmlObjToArray(this.showEmailOrMobile(tmpId));
      if (
        ((isSet(changeiso) && changeiso === "IN") || this.usercountry === "IN") &&
        this.setCity === ""
      )
        this.addHtmlObjToArray(this.showCity(tmpId));
    }
  
    if (this.ContactDetailHtmlObjArray.length > 0) {
      if (!IsChatbl(tmpId)) {
        var clsnm =
          pdpenqImage(tmpId) ||
          isFirstImgVidCTA(tmpId) ||
          isSSB(tmpId) ||
          isFirstImgVidCTAFR(tmpId) ||
          isBlInlineFr(tmpId) ||
          ((isEnq(tmpId) || Bl09(tmpId)) &&
            currentISO() !== "IN" &&
            imeshExist() === "")
            ? ""
            : isMoglixUi(tmpId)
            ? "bemt10"
            : "beW5"; //tmpid to be replaced by formtype
        if (pdpInactiveBL(tmpId)) clsnm = "";
        if (
          ReqObj.Form[tmpId].ctaName.toLowerCase() === "middle" &&
          Bl04(tmpId) &&
          ReqObj.Form[tmpId].FormSequence._screenCounter === 0
        )
          clsnm = "";
        var wrapperclass =
          isSSB(tmpId) || isBlInline(tmpId) || isMoglixUi(tmpId)
            ? ""
            : pdpInactiveBL(tmpId)
            ? "belft beW11 bemgb15"
            : "belft beW11 beclr";
        if (
          tmpId.substring(0, 2) === "09" &&
          !imeshExist() &&
          currentISO() === "IN"
        )
          wrapperclass += " bedsnone";
        var appendDiv =
          !isImageVidEnq(tmpId) &&
          isEnq(tmpId) &&
          currentISO() !== "IN" &&
          ReqObj.Form[tmpId].FormSequence._stepCounter === 0 &&
          !imeshExist()
            ? "<div class='berow'></div>"
            : "";
        var ContactInfoSuffixOuterHtml =
          "<div class='" +
          wrapperclass +
          "' id='t" +
          tmpId +
          "_contactinfo" +
          this.classCount +
          "'>" +
          appendDiv +
          "<div id='t" +
          tmpId +
          "_idcontactscreen" +
          this.classCount +
          "' class='" +
          clsnm +
          "'>";
        var countryDiv = this.countryDiv(tmpId);
        var cntflg = flagd(countryDiv, tmpId);
        var ContactInfoSuffixClosingHtml =
          Bl04(tmpId) &&
          ReqObj["Form"][tmpId].modId === "DIR" &&
          !isNotfoundBl(tmpId) &&
          ReqObj.Form[tmpId].flag
            ? "</div></div >" + cntflg
            : "</div></div >";
        var ContactInfoSuffixHtmlObj = {
          SuffixOuterHtml: ContactInfoSuffixOuterHtml,
          SuffixClosingHtml: ContactInfoSuffixClosingHtml,
          suffix: "_contactinfo",
          isPhone: this.phonecalled,
        };
        var contactdetailhtml = MakeWrapper(
          this.ContactDetailHtmlObjArray,
          tmpId,
          ContactInfoSuffixHtmlObj,
          ""
        );
      } else {
        var contactcls = "beW5";
        var ContactInfoSuffixOuterHtml =
          "<div class='cbl_ques cbl_vh' id='t" +
          tmpId +
          "_contactinfo" +
          this.classCount +
          "'> <div id='t" +
          tmpId +
          "_idcontactscreen" +
          this.classCount +
          "' class='" +
          contactcls +
          "'>";
        var ContactInfoSuffixClosingHtml = "</div></div > ";
        var appendExtra = "";
        var suggCity = "";
        if (
          isSet(this.ContactDetailHtmlObjArray[0]) &&
          isSet(this.ContactDetailHtmlObjArray[0][0]) &&
          isSet(this.ContactDetailHtmlObjArray[0][0].appendExtra)
        ) {
          appendExtra = this.ContactDetailHtmlObjArray[0][0].appendExtra;
        }
        if (
          isSet(this.ContactDetailHtmlObjArray[0]) &&
          isSet(this.ContactDetailHtmlObjArray[0][0]) &&
          isSet(this.ContactDetailHtmlObjArray[0][0].suggCity)
        ) {
          suggCity = this.ContactDetailHtmlObjArray[0][0].suggCity;
        }
        this.contactdetailLabelhtml =
          MakeWrapper(
            this.ContactDetailHtmlObjArray,
            tmpId,
            WrapperObj(
              ContactInfoSuffixOuterHtml,
              ContactInfoSuffixClosingHtml,
              "_contactinfo"
            ),
            "ques"
          ) +
          appendExtra +
          suggCity +
          "</div>";
  
        var ContactInfoSuffixOuterHtml =
          "<div class='t" +
          tmpId +
          "_userInput cbl_br10 dn' id='t" +
          tmpId +
          "_contactinfo" +
          this.classCount +
          "'> <div id='t" +
          tmpId +
          "_idcontactscreen" +
          this.classCount +
          "' class='beW5 cbl_dtls cbl_name cbl_df cbl_w1 cbl_br10'>";
        var ContactInfoSuffixClosingHtml = "</div></div > ";
        this.contactdetailInputhtml = MakeWrapper(
          this.ContactDetailHtmlObjArray,
          tmpId,
          WrapperObj(
            ContactInfoSuffixOuterHtml,
            ContactInfoSuffixClosingHtml,
            "_contactinfo"
          ),
          "input"
        );
        var contactdetailhtml =
          this.contactdetailLabelhtml + this.contactdetailInputhtml;
      }
      ReqObj.Form[tmpId].ContactDetail[this.classCount] = contactdetailhtml;
      return contactdetailhtml;
    } else return "";
  };
  
  ContactDetail.prototype.hasHtml = function (ContactDetailObj) {
    if (isSet(ContactDetailObj)) {
      var tmpId = ContactDetailObj.tmpId;
      this.type = isSet(ContactDetailObj.type)
        ? ContactDetailObj.type
        : { code: "", step: "" };
      this.getClassCount(tmpId);
      this.nonMandatory =
        typeof ContactDetailObj.nonMandatory !== "undefined"
          ? ContactDetailObj.nonMandatory
          : "";
      this.captureDetails(tmpId);
      this.cookies(tmpId);
      this.onlastscreen =
        isSet(ContactDetailObj.additionalkey) &&
        isSet(ContactDetailObj.additionalkey.onlastscreen)
          ? ContactDetailObj.additionalkey.onlastscreen
          : false;
      this.contactdetailhtml = this.getContactDetailHtml(tmpId);
  
      ContactDetailObj.that.NumberofClassCalled -= 1;
  
      if (this.contactdetailhtml !== "") {
        ReqObj.Form[tmpId].currentclassCount++;
        this.ifHtmlPresent(ContactDetailObj, tmpId);
      } else {
        this.ifHtmlNotPresent(ContactDetailObj, tmpId);
      }
    }
  };
  
  ContactDetail.prototype.ifHtmlPresent = function (ContactDetailObj, tmpId) {
    AttachObject(ContactDetailObj.object, tmpId);
    if (isSet(ContactDetailObj.AfterService)) {
      for (var i = 0; i < ContactDetailObj.AfterService.length; i++) {
        ContactDetailObj.that.MakeSeq(ContactDetailObj.AfterService[i], tmpId);
      }
    }
    if (ContactDetailObj.that.NumberofClassCalled === 0) {
      makeFinalSeq(ContactDetailObj, tmpId);
    }
  };
  
  ContactDetail.prototype.ifHtmlNotPresent = function (ContactDetailObj, tmpId) {
    if (ContactDetailObj.hasFallback) {
      CreateSeq(ContactDetailObj.FallbackObj);
    }
  };
  
  ContactDetail.prototype.defaultEvents = function (tmpId) {
    var that = this;
    if (ReqObj.Form[tmpId].afflId === "-126")
      $("#t" + tmpId + "_q_first_nm").attr("placeholder", "Enter your Name");
    that.handleUI({
      data: {
        obj: that,
        todo: "nameUI",
        tmpId: tmpId,
      },
    });
    that.handleUI({
      data: {
        obj: that,
        todo: "default",
        tmpId: tmpId,
      },
    });
    if (ReqObj.Form[tmpId].OnCloseStep === true) {
      that.handleUI({
        data: {
          obj: that,
          todo: "cityOthers",
          tmpId: tmpId,
        },
      });
    }
    if (IsChatbl(tmpId)) {
      that.handleUI({
        data: {
          obj: that,
          todo: "focus",
          tmpId: tmpId,
        },
      });
      ChatblfooterAns(tmpId);
    }
    that.handleEvents(this, tmpId);
    if (isOtherEnq(tmpId)) {
      if (NEC()) $("#t" + tmpId + "_hdg").addClass("ln26");
    }
    if (imeshExist() !== "" && !pdpInactiveBL(tmpId))
      $("#t" + tmpId + "_leftR").removeClass("lftMgn");
    get_buyer_info(tmpId);
  };
  ContactDetail.prototype.validate = function (tmpId) {
    this.classCount = returnObjectSize(ReqObj.Form[tmpId].ContactDetail);
    ReqObj.Form[tmpId].nec.classCount = this.classCount;
    this.cookies(tmpId);
    var isValid = this.validateUserDetails(tmpId);
    if (isValid === true) this.captureDetails(tmpId);
    return isValid;
  };
  ContactDetail.prototype.onSubmit = function (tmpId) {
    $("#yajaca").hide(); // click away message
    var CDObject = PreAjax("ContactDetail", tmpId);
    this.sendRequest(CDObject, tmpId);
  };
  
  ContactDetail.prototype.cookies = function (tmpId) {
    this.imeshCookie = imeshExist();
    this.iplocCookie = usercookie.getCookie("iploc");
    this.geoip_country_iso = usercookie.getParameterValue(
      this.iplocCookie,
      "gcniso"
    );
    if (this.imeshCookie !== "") {
      this.setName = ReqObj.UserDetail["fn"];
      this.setEmail = ReqObj.UserDetail["em"];
      this.setCity =
        ReqObj.UserDetail["ctid"] !== ""
          ? ReqObj.UserDetail["ctid"]
          : ReqObj.UserDetail["cityname"] !== ""
          ? ReqObj.UserDetail["cityname"]
          : ReqObj.UserDetail["ctoth"] !== ""
          ? ReqObj.UserDetail["ctoth"]
          : "";
      this.setMobile = ReqObj.UserDetail["mb1"];
      this.usercountry = usercookie.getParameterValue(this.imeshCookie, "iso");
    }
  };
  
  ContactDetail.prototype.captureDetails = function (tmpId) {
    var iso = currentISO();
    var imeshcookie = imeshExist();
    if (iso === "IN") {
      var email =
        $("#t" + tmpId + "_q_email_in" + this.classCount).length > 0
          ? $("#t" + tmpId + "_q_email_in" + this.classCount).val()
          : ReqObj.UserDetail["em"];
      ReqObj.UserDetail["em"] = ReturnCorrectVal(
        usercookie.getParameterValue(imeshcookie, "em"),
        email
      );
      if (typeof ReqObj.UserDetail["em"] === "undefined")
        ReqObj.UserDetail["em"] = "";
    } else {
      var mobile =
        $("#t" + tmpId + "_q_mobile_f" + this.classCount).length > 0
          ? $("#t" + tmpId + "_q_mobile_f" + this.classCount).val()
          : ReqObj.UserDetail["mb1"];
      ReqObj.UserDetail["mb1"] = ReturnCorrectVal(
        usercookie.getParameterValue(imeshcookie, "mb1"),
        mobile
      );
      if (typeof ReqObj.UserDetail["mb1"] === "undefined")
        ReqObj.UserDetail["mb1"] = "";
    }
  
    var fn =
      $("#t" + tmpId + "_q_first_nm" + this.classCount).length > 0
        ? $("#t" + tmpId + "_q_first_nm" + this.classCount).val()
        : ReqObj.UserDetail["fn"];
    ReqObj.UserDetail["fn"] = ReturnCorrectVal(
      usercookie.getParameterValue(imeshcookie, "fn"),
      fn
    );
    ReqObj.UserDetail["fn"] !== ""
      ? $(".gd").removeClass("dn")
      : $(".gd").addClass("dn");
    if (typeof ReqObj.UserDetail["fn"] === "undefined")
      ReqObj.UserDetail["fn"] = "";
  
    var ctid =
      $("#t" + tmpId + "city_id_sugg" + this.classCount).length > 0
        ? $("#t" + tmpId + "city_id_sugg" + this.classCount).val()
        : ReqObj.UserDetail["ctid"];
    ReqObj.UserDetail["ctid"] = ReturnCorrectVal(
      usercookie.getParameterValue(imeshcookie, "ctid"),
      ctid
    );
    if (typeof ReqObj.UserDetail["ctid"] === "undefined")
      ReqObj.UserDetail["ctid"] = "";
  
    ReqObj.UserDetail["cityname"] =
      !isSSB(tmpId) &&
      $("#t" + tmpId + "_q_city_oth" + this.classCount).length > 0
        ? $("#t" + tmpId + "_q_city_oth" + this.classCount).val()
        : ReqObj.UserDetail["cityname"];
    if (typeof ReqObj.UserDetail["cityname"] === "undefined")
      ReqObj.UserDetail["cityname"] = "";
  
    ReqObj.UserDetail["ctoth"] =
      ReqObj.UserDetail["ctid"] === "" ? ReqObj.UserDetail["cityname"] : "";
  };
  ContactDetail.prototype.toUpdate = function (tmpId) {
    if (imeshExist()) return true;
    return false;
  };
  ContactDetail.prototype.showName = function (tmpId) {
    var that = this;
    var formType = ReqObj.Form[tmpId].formType.toLowerCase();
    that.getLabelName(tmpId, formType);
    that.getInputName(tmpId, formType);
    that.ContactDetailHtmlNameObj["OuterWrapper"] = "";
    that.ContactDetailHtmlNameObj["ClosingWrapper"] = "";
    that.shownHtml.push("name");
    return that.ContactDetailHtmlNameObj;
  };
  
  ContactDetail.prototype.getLabelName = function (tmpId, formType) {
    var that = this;
    var name = returnSpan("t" + tmpId,"login_span_bold" + this.classCount,"Name","befwt");
    var labeltext = IsChatbl(tmpId) ? "Please tell us your " + name : (pdpInactiveBL(tmpId)) ? "Name <span class='redc'>*</span>" : "Name";
    if (isBlInlineFr(tmpId)) {
      labeltext += "*";
    }
    var labelclass = IsChatbl(tmpId) || isSSB(tmpId) ? ssbClass("label", tmpId) : isBlInline(tmpId) ? isBlInlineFr(tmpId) ? "fs0 wf fadLbl" : "fs15 cl11"
        : isSticky(tmpId) ? "FM_be-lbl" : isBlFirstfold(tmpId) ? "be-lbl dn" : "be-lbl"; //ff_here
    var namehtml = returnLabel( "t" + tmpId, labeltext, "_name-lb" + this.classCount, labelclass);
    that.ContactDetailHtmlNameObj["Label"] = namehtml;
  };
  
  ContactDetail.prototype.getInputName = function (tmpId, formType) {
    var that = this;
    var placeholder = IsChatbl(tmpId)
      ? " Enter your Name"
      : isEnq(tmpId) && isSet(this.type) && this.type.code !== "name"
      ? ""
      : "Enter your Name";
    if (
      (isOtherEnq(tmpId) && tmpId.substring(0, 2) === "09") ||
      (isOtherEnq(tmpId) &&
        tmpId.substring(0, 2) !== "09" &&
        ReqObj.Form[tmpId].FormSequence.StepCounter > 0)
    )
      placeholder = "";
    var sticky = isSticky(tmpId) ? "FM_be-slbox" : "be-slbox";
    var inputclass = IsChatbl(tmpId)
      ? "blchat-inpt"
      : isSSB(tmpId) || isBlInline(tmpId)
      ? ""
      : sticky + " inpt_errorbx";
    if (isOtherEnq(tmpId)) {
      inputclass = inputclass + " inPlace";
    }
    if (pdpInactiveBL(tmpId)) {
      inputclass = inputclass + " bed_input cpNm";
      if(currentISO()!="IN" && isSet(ReqObj.UserDetail.em) && ReqObj.UserDetail.em==''){
          inputclass += " wid_255"
      }
      else if(currentISO()!="IN" ){
          inputclass += " wid_320"
      }
    }
    var namehtml = "";
    // namehtml += (isSSB(tmpId)) ? "<div class=' mb-wdIn'>" : returnInput("t" + tmpId, "_q_first_nm_hidden" + this.classCount, "hidden", " ", " ", " ", " ", " ", " ");
    namehtml += isSSB(tmpId)
      ? ""
      : returnInput(
          "t" + tmpId,
          "_q_first_nm_hidden" + this.classCount,
          "hidden",
          " ",
          " ",
          " ",
          " ",
          " ",
          " "
        );
    var fname = rvalue(tmpId, "fname");
    var nameInput = returnInput(
      "t" + tmpId,
      "_q_first_nm" + this.classCount,
      "text",
      "q_first_nm",
      placeholder,
      inputclass,
      fname,
      " ",
      " "
    );
    namehtml += isBlInline(tmpId)
      ? "<div class ='pflx1 pr'><div class ='inW240'>" + nameInput + "</div>"
      : nameInput;
    if (IsChatbl(tmpId)) {
      var html = "";
      namehtml += html;
      // var errorhtml = this.getChatblNameErrorDiv(tmpId);
      // namehtml += errorhtml;
    } else {
      var errorhtml = this.getNameErrorDiv(tmpId);
      namehtml += isBlInline(tmpId) ? errorhtml + " </div>" : errorhtml;
    }
    that.ContactDetailHtmlNameObj["UserInput"] = namehtml;
    if (ReqObj.Form[tmpId].FormSequence._stepCounter === 0)
      ReqObj.Form[tmpId]._NCOnFrstScrn = true;
  };
  
  ContactDetail.prototype.getNameErrorDiv = function (tmpId) {
    var html = "";
    if (isSSB(tmpId)) {
      return nameErrorDivSSB(tmpId, this);
    }
    var sticky = isSticky(tmpId) ? "FM_beerrp1" : (pdpInactiveBL(tmpId)) ? (currentISO()!='IN') ? "namerrfn" : "nmerrin" :  "beerrp1";
    if(pdpInactiveBL(tmpId)){
        if(currentISO()!='IN' && ReqObj.UserDetail.em!="" && isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn==''){
            sticky += " lft"
        }
        if(currentISO()=="IN"){
          if(ReqObj.Form[tmpId].currentclassCount!=1){
              sticky +=" top-16"
          }
        }
    }
    
  
    html =(isOtherEnq(tmpId) && tmpId.substring(0, 2) === "09") || (isOtherEnq(tmpId) && ReqObj.Form[tmpId].FormSequence.StepCounter > 0)
        ? html + returnContainer( "t" + tmpId, "_error_first_name" + this.classCount, "be-erbx beerrp bedsnone", "", "")
        : html + returnContainer( "t" + tmpId, "_error_first_name" + this.classCount, sticky + " be-erbx bedsnone", "", "");
    html += returnContainer( "t" + tmpId, "_fname_errmsg" + this.classCount, "", "content", "" );
    html += "</div >";
    html = (isOtherEnq(tmpId) && tmpId.substring(0, 2) === "09") || (isOtherEnq(tmpId) && ReqObj.Form[tmpId].FormSequence.StepCounter > 0) ? html
      : html + '<a class="be-erarw" data-role="arrow"></a>';
    html += "</div >";
    return html;
  };
  
  ContactDetail.prototype.getChatblNameErrorDiv = function (tmpId) {
    var html = "";
    html += returnContainer(
      "t" + tmpId,
      "_error_first_name" + this.classCount,
      "redc bltperor",
      "",
      ""
    );
    html += returnContainer(
      "t" + tmpId,
      "_fname_errmsg" + this.classCount,
      "",
      "content",
      ""
    );
    html += "</div >";
    html += "</div>";
    return html;
  };
  
  ContactDetail.prototype.showEmailOrMobile = function (tmpId) {
    var that = this;
    var changeiso = currentISO();
    var formType = ReqObj.Form[tmpId].formType.toLowerCase();
  
    that.getLabelEmailMobile(tmpId, formType, changeiso);
    that.getInputEmailMobile(tmpId, formType, changeiso);
    that.ContactDetailHtmlEmailObj["OuterWrapper"] = "";
    that.ContactDetailHtmlEmailObj["ClosingWrapper"] = "";
    if (changeiso === "IN") that.shownHtml.push("email");
    else that.shownHtml.push("phone");
    return that.ContactDetailHtmlEmailObj;
  };
  
  ContactDetail.prototype.getLabelEmailMobile = function (tmpId,formType,changeiso) {
    var that = this;
    var label = "";
    if (changeiso === "IN") {
      label = "Email";
    } else {
      if (currentISO() !== "IN" && (tmpId.substring(0, 2) === "09" || IsChatbl(tmpId)))
        label = "Phone Number";
      else if(pdpInactiveBL(tmpId)){
        label = "Mobile <span class='redc'>*</span>";
      } 
      else label = "Mobile";
    }
    var labelelement = changeiso === "IN" ? "_email-lb" : "_mobile-lb";
    var labeltext = IsChatbl(tmpId) ? "Please share your " + returnSpan("t" + tmpId, "login_span_bold" + this.classCount,label + " ID ","befwt"): label;
    var labelclass = IsChatbl(tmpId)? "" : isSSB(tmpId) ? ssbClass("label", tmpId) : "be-lbl";
    that.phonecalled = changeiso === "IN" ? false : true;
    that.ContactDetailHtmlEmailObj["Label"] = returnLabel( "t" + tmpId, labeltext, labelelement + this.classCount,labelclass);
  };
  ContactDetail.prototype.getInputEmailMobile = function (
    tmpId,
    formType,
    changeiso
  ) {
    var that = this;
    var inputelement = changeiso === "IN" ? "_q_email_in" : "_q_mobile_f";
    var emvalue = isSSB(tmpId)
      ? changeiso === "IN"
        ? rvalue(tmpId, "evalue")
        : rvalue(tmpId, "mobval")
      : "";
    var inputclass = IsChatbl(tmpId)
      ? "blchat-inpt"
      : isSSB(tmpId)
      ? ""
      : changeiso === "IN"
      ? "be-slbox inpt_errorbx"
      : isMoglixUi(tmpId)
      ? "be-input beW3 beh32"
      : "be-input benords beW3 beh32";
    if (isOtherEnq(tmpId)) {
      inputclass = inputclass + " inPlace";
    }
    if (changeiso === "IN") {
      label = "Email";
    } else {
      if (
        currentISO() !== "IN" &&
        (tmpId.substring(0, 2) === "09" || IsChatbl(tmpId))
      )
        label = "Phone";
      else label = "Mobile";
    }
    if (pdpInactiveBL(tmpId)) {
      if (inputelement == "_q_mobile_f")
        inputclass = "be-slbox inpt_errorbx bed-input benords cpNm";
      else{
          inputclass = "be-slbox inpt_errorbx bed_input cpNm";
      }
    }
    // var label = (changeiso === "IN") ? "Email" : "Phone";
    var emailmobilehtml = "";
  
    if (!isSSB(tmpId) && changeiso !== "IN") {
      ReqObj.isoFlag = usercookie.getParameterValue(that.imeshCookie, "phcc");
      //ReqObj.isoFlag = (ReqObj.isoFlag !== "") ? ReqObj.isoFlag : usercookie.getParameterValue(that.imeshCookie, "phcc"); //iso reload error
      ReqObj.isoFlag =
        ReqObj.isoFlag.substring(0, 1) === "+"
          ? ReqObj.isoFlag
          : "+" + ReqObj.isoFlag;
      var isoclass = IsChatbl(tmpId) ? "beiso" : (pdpInactiveBL(tmpId)) ? "be-flisq iso brdlft8" : "be-flisq iso";
      emailmobilehtml += returnIsoHtml(tmpId, isoclass, ReqObj.isoFlag);
    }
  
    var placeholder = changeiso==="IN" && (IsChatbl(tmpId) || pdpInactiveBL(tmpId))
        ? "Enter your Email"
        : changeiso !== "IN" && !isOtherEnq(tmpId)
        ? "Enter your Phone"
        : "";
    // emailmobilehtml += (isSSB(tmpId)) ? '<div class="mb-wdIn">' : ""
    var instyle =
      Bl09(tmpId) && imeshExist() === "" ? "width: calc(100% - 52px);" : "";
  
    emailmobilehtml += returnInput(
      "t" + tmpId,
      inputelement + this.classCount,
      "text",
      inputelement + this.classCount,
      placeholder,
      inputclass,
      emvalue,
      instyle,
      ""
    );
    if (IsChatbl(tmpId)) {
      var html = "";
      emailmobilehtml += html;
      var errorhtml = this.getChatblEmailMobileErrorDiv(tmpId, changeiso);
      emailmobilehtml += errorhtml;
    } else {
      if (
        changeiso === "IN" &&
        ReqObj.Form[tmpId].typeofform.toLowerCase() !== "bl"
      ) {
        emailmobilehtml +=
          returnContainer(
            "t" + tmpId,
            "_helpmsg",
            "be-msghlp",
            "",
            "Supplier will contact you on this email",
            ""
          ) + "</div>";
      }
      var errorhtml = this.getEmailMobileErrorDiv(tmpId, changeiso);
      emailmobilehtml += errorhtml;
      emailmobilehtml += isSSB(tmpId) ? "</div>" : "";
    }
    that.ContactDetailHtmlEmailObj["UserInput"] = emailmobilehtml;
  };
  
  ContactDetail.prototype.getEmailMobileErrorDiv = function (tmpId, changeiso) {
    if (isSSB(tmpId)) {
      return emailMobileErrorDivSSB(tmpId, changeiso, this);
    }
    var html = "";
    var errorconatiner = changeiso === "IN" ? "_err_email" : "_error_mobile";
    html =
      (isOtherEnq(tmpId) && tmpId.substring(0, 2) === "09") ||
      (isOtherEnq(tmpId) && ReqObj.Form[tmpId].FormSequence.StepCounter > 0)
        ? html +
          returnContainer(
            "t" + tmpId,
            errorconatiner + this.classCount,
            "be-erbx beerrp bedsnone",
            "",
            ""
          )
        : html +
          returnContainer(
            "t" + tmpId,
            errorconatiner + this.classCount,
            "beerrp1 be-erbx bedsnone error_blck",
            "",
            ""
          );
    errorconatiner = changeiso === "IN" ? "_email_errmsg" : "_mobile_errmsg";
    html += returnContainer(
      "t" + tmpId,
      errorconatiner + this.classCount,
      "",
      "content",
      ""
    );
    html += "</div>";
    html =
      (isOtherEnq(tmpId) && tmpId.substring(0, 2) === "09") ||
      (isOtherEnq(tmpId) && ReqObj.Form[tmpId].FormSequence.StepCounter > 0)
        ? html + "</div>"
        : html + '<a class="be-erarw" data-role="arrow"></a></div>';
    return html;
  };
  
  ContactDetail.prototype.getChatblEmailMobileErrorDiv = function (
    tmpId,
    changeiso
  ) {
    var html = "";
    var errorconatiner = changeiso === "IN" ? "_err_email" : "_error_mobile";
    html += returnContainer(
      "t" + tmpId,
      errorconatiner + this.classCount,
      "beerrp1 be-erbx bedsnone error_blck",
      "",
      ""
    );
    errorconatiner = changeiso === "IN" ? "_email_errmsg" : "_mobile_errmsg";
    html += returnContainer(
      "t" + tmpId,
      errorconatiner + this.classCount,
      "",
      "content",
      ""
    );
    html += "</div>";
    html += "</div>";
    return html;
  };
  
  ContactDetail.prototype.showCity = function (tmpId) {
    var that = this;
    if (!usercookie.getParameterValue(this.imeshCookie, "ctid")) {
      /* City Already Exists. */
      var formType = ReqObj.Form[tmpId].formType.toLowerCase();
      that.getLabelCity(tmpId, formType);
      that.getInputCity(tmpId, formType);
      that.ContactDetailHtmlCityObj["OuterWrapper"] = IsChatbl(tmpId) ? "" : "";
      that.ContactDetailHtmlCityObj["ClosingWrapper"] = IsChatbl(tmpId) ? "" : "";
      that.shownHtml.push("city");
      var form_type =
        ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
      blenqGATracking(form_type, "Cityshown", getEventLabel(), 1, tmpId);
      return that.ContactDetailHtmlCityObj;
    }
  };
  
  ContactDetail.prototype.getPrefillCity = function (tmpId, formType) {
    var city = "";
    if (ReqObj.Form[tmpId].OnCloseStep !== true) {
      city =
        ReqObj.UserDetail["ipcityname"] !== "" &&
        ReqObj.UserDetail["ipcityname"] !== "null"
          ? ReqObj.UserDetail["ipcityname"]
          : ReqObj.Form[tmpId].cityOth !== ""
          ? ReqObj.Form[tmpId].cityOth
          : "";
      if (
        usercookie.getCookie("xnHist") !== "" &&
        (!isSet(city) || city === "")
      ) {
        var xnHistCity = usercookie.getParameterValue(
          usercookie.getCookie("xnHist"),
          "city"
        );
        xnHistCity = xnHistCity.charAt(0).toUpperCase() + xnHistCity.slice(1);
        city = xnHistCity;
      }
      if (city.toLowerCase() === "undefined") city = "";
      return city;
    }
    city =
      ReqObj.Form[tmpId].cityOth !== ""
        ? ReqObj.Form[tmpId].cityOth
        : ReqObj.UserDetail["ipcityname"] !== "" &&
          ReqObj.UserDetail["ipcityname"] !== "null"
        ? ReqObj.UserDetail["ipcityname"]
        : "";
    return city;
  };
  
  ContactDetail.prototype.getLabelCity = function (tmpId, formType) {
    var that = this;
    var citybold = returnSpan("", "", "City", "befwt");
    var labeltext = IsChatbl(tmpId) ? "Tell us your " + citybold + " to connect you to nearby sellers" :(pdpInactiveBL(tmpId))? "City <span class='redc'>*</span>" : "City";
    var labelclass = IsChatbl(tmpId) ? "" : isSSB(tmpId) ? ssbClass("label", tmpId) : "be-lbl";
    that.ContactDetailHtmlCityObj["Label"] = returnLabel("t" + tmpId, labeltext,"_for-city-lb" + this.classCount,labelclass);
  };
  
  ContactDetail.prototype.getInputCity = function (tmpId, formType) {
    var that = this;
    var prefilCity = that.getPrefillCity(tmpId, formType);
    prefilCity = isSet(prefilCity) ? prefilCity : "";
    if (isSet(prefilCity) && prefilCity !== "")
      ReqObj.Form[tmpId].cityTracking = 1;
    var inputclass = IsChatbl(tmpId)
      ? "blchat-inpt"
      : isSSB(tmpId)
      ? "ui-autocomplete-input"
      : "be-slbox inpt_errorbx ui-autocomplete-input";
    if (isOtherEnq(tmpId)) {
      inputclass = inputclass + " inPlace";
    }
    if (pdpInactiveBL(tmpId)) {
      inputclass = inputclass + " bed_input cpNm wid_285";
    }
    var placeholder = IsChatbl(tmpId)
      ? "Enter your City"
      : isOtherEnq(tmpId)
      ? ""
      : "Enter City Name";
    var spantext = IsChatBLInline(tmpId) ? "Detect City" : "Detect My City";
    // var spantext = (IsChatbl(tmpId) || isSSB(tmpId)) ? "" : "Detect My City";
    // var spantext = (IsChatbl(tmpId) || isSSB(tmpId)) ? "" : "Change Your City";
    // var spanclass = (IsChatbl(tmpId)|| isSSB(tmpId)) ? "" : "beChtxt";
    var spanclass = isBl(tmpId)
      ? (pdpInactiveBL(tmpId))? "dml" :"beChtxt dc_mid"
      : "beChtxt";
    spanclass =
      (isImageVidEnq(tmpId) &&
        ReqObj.Form[tmpId].FormSequence._stepCounter === 0) ||
      isMoglixUi(tmpId) ||
      pdpenqImage(tmpId)
        ? "clr_blue befs13 bemt5 disp-inl crP enq_ct"
        : spanclass;
    // var cityhtml = (isSSB(tmpId) ) ? '<div class="mb-wdIn">' : "";
    var cityhtml = "";
    if (isSSB(tmpId) && prefilCity == "") prefilCity = rvalue(tmpId, "cvalue");
    cityhtml +=
      '<input type="text" templateId="' +
      tmpId +
      '" name="q_city_oth' +
      that.classCount +
      '" id="t' +
      tmpId +
      "_q_city_oth" +
      that.classCount +
      '"' +
      'placeholder="' +
      placeholder +
      '" value="' +
      prefilCity +
      '" class="' +
      inputclass +
      '" maxlength = "100" autocomplete = "off" role = "textbox" aria-autocomplete="list" aria-haspopup="true"';
    if (IsChatbl(tmpId) || isSSB(tmpId)) {
      cityhtml += ">";
    } else {
      cityhtml += ">";
      // cityhtml += ' readonly="" disabled="disabled">';
    }
    if (isSSB(tmpId)) {
      cityhtml += returnInput(
        "t" + tmpId,
        "city_id_sugg" + that.classCount,
        "hidden",
        "",
        "",
        "",
        "",
        "",
        ""
      );
      cityhtml += returnSpan(
        "t" + tmpId,
        "_detect_city" + that.classCount,
        spantext,
        spanclass
      );
      cityhtml +=
        that.getCityErrorDiv(tmpId) + "</div>" + that.getCitySuggDiv(tmpId);
    } else if (IsChatbl(tmpId)) {
      var html = "";
      cityhtml += html;
      // cityhtml +=returnSpan("t" + tmpId, "_detect_city" + that.classCount, spantext, spanclass);
      that.ContactDetailHtmlCityObj["suggCity"] = that.getCitySuggDiv(tmpId);
      that.ContactDetailHtmlCityObj["appendExtra"] = returnSpan(
        "t" + tmpId,
        "_detect_city" + that.classCount,
        spantext,
        spanclass
      );
    } else {
      cityhtml += returnInput(
        "t" + tmpId,
        "city_id_sugg" + that.classCount,
        "hidden",
        "",
        "",
        "",
        "",
        "",
        ""
      );
      cityhtml += returnSpan(
        "t" + tmpId,
        "_detect_city" + that.classCount,
        spantext,
        spanclass
      );
      var errorhtml = that.getCityErrorDiv(tmpId);
      cityhtml += that.getCitySuggDiv(tmpId) + errorhtml;
    }
    if (ReqObj.Form[tmpId].FormSequence._stepCounter === 0)
      ReqObj.Form[tmpId]._NCOnFrstScrn = true;
    that.ContactDetailHtmlCityObj["UserInput"] = cityhtml;
  };
  
  ContactDetail.prototype.getCityErrorDiv = function (tmpId) {
    var html = "";
    if (isSSB(tmpId)) {
      return cityErrorDivSSB(tmpId, this);
    }
    var cityerrcls = "beerrp1";
    if(pdpInactiveBL(tmpId)){
        cityerrcls="cityerr2";
        if(ReqObj.Form[tmpId].currentclassCount==1){
            cityerrcls =" cityerr"
        }
    }
  
    html =(isOtherEnq(tmpId) && tmpId.substring(0, 2) === "09") || (isOtherEnq(tmpId) && ReqObj.Form[tmpId].FormSequence.StepCounter > 0)
        ? html + returnContainer( "t" + tmpId, "_error_city" + this.classCount, "be-erbx beerrp bedsnone","","")
        : html + returnContainer("t" + tmpId,"_error_city" + this.classCount, cityerrcls + " be-erbx bedsnone","","");
    html += returnContainer("t" + tmpId,"_city_errmsg" + this.classCount,"","content","");
    html = (isOtherEnq(tmpId) && tmpId.substring(0, 2) === "09") || (isOtherEnq(tmpId) && ReqObj.Form[tmpId].FormSequence.StepCounter > 0)
        ? html + "</div>"
        : html + '</div><a class="be-erarw" data-role="arrow"></a>';
    html += "</div>";
    return html;
  };
  
  ContactDetail.prototype.getCitySuggDiv = function (tmpId) {
    var ipLoc = iplocExist();
    var html = "";
    var cityArr = {};
    var hdCt = usercookie.getParameterValue(
      usercookie.getCookie("xnHist"),
      "city"
    );
    hdCt = hdCt.charAt(0).toUpperCase() + hdCt.slice(1);
    cityArr[usercookie.getParameterValue(ipLoc, "lg_ct")] =
      usercookie.getParameterValue(ipLoc, "lg_ctid");
    cityArr[hdCt] = "";
    cityArr[usercookie.getParameterValue(ipLoc, "gctnm")] =
      usercookie.getParameterValue(ipLoc, "gctid");
    var count = 0;
    for (var ct in cityArr) {
      if (
        (ct.toLowerCase() !== "all india" || ct.toLowerCase() !== "undefined") &&
        ct.toLowerCase() !== ""
      ) {
        html += count > 0 ? " | " : "";
        html +=
          "<span class = 'suggClr clr_blue' onClick='return prefilSuggCity(\"" +
          tmpId +
          '","' +
          this.classCount +
          '" ,"' +
          cityArr[ct] +
          '", "' +
          ct +
          "\")'>" +
          ct +
          "</span>";
        count += 1;
      }
    }
    return count > 0
      ? "<div class = 'citySuggClr'>Suggestions: " + html + "</div>"
      : "";
  };
  
  function prefilSuggCity(tmpId, classCount, ctid, city) {
    $("#t" + tmpId + "_q_city_oth" + classCount).val(city);
    $("#t" + tmpId + "_q_city_oth" + classCount)
      .parent()
      .addClass("eqfcsed");
    $("#t" + tmpId + "city_id_sugg" + classCount).val(ctid);
    $("#t" + tmpId + "_q_city_oth" + classCount).focus();
    ReqObj.Form[tmpId].cityTracking = 2;
  }
  
  ContactDetail.prototype.getChatblCityErrorDiv = function (tmpId) {
    var html = "";
    html += returnContainer(
      "t" + tmpId,
      "_error_city" + this.classCount,
      "redc bltperor",
      "",
      ""
    );
    html += returnContainer(
      "t" + tmpId,
      "_city_errmsg" + this.classCount,
      "",
      "content",
      ""
    );
    html += "</div></div>";
    return html;
  };
  
  ContactDetail.prototype.validateUserDetails = function (tmpId) {
    if (!isSet(validation)) createGlobalObject();
    var validate = "";
    var that = this;
    var form_type =
      ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
    var StepNumber =
      ReqObj.Form[tmpId].OnCloseStep && isSet(ReqObj.Form[tmpId].FormSequence)
        ? ReqObj.Form[tmpId].FormSequence.StepCounter +
          1 +
          ReqObj.Form[tmpId].FormSequence.OnCloseCounter +
          1
        : ReqObj.Form[tmpId].FormSequence.StepCounter + 1;
    ReqObj.Form[tmpId].errorDivId = "";
    if (
      $("#t" + tmpId + "_q_first_nm" + that.classCount).length > 0 &&
      (that.nonMandatory === "" ||
        (isSet(that.nonMandatory) && that.nonMandatory["name"] === false) ||
        $("#t" + tmpId + "_q_first_nm" + that.classCount).val() !== "" ||
        isSSB(tmpId))
    ) {
      validate = validation.isNameValid(
        $("#t" + tmpId + "_q_first_nm" + that.classCount).val()
      );
      if (!validate["type"]) {
        ReqObj.Form[tmpId].validateArray.push(
          "t" + tmpId + "_q_first_nm" + that.classCount
        );
        var nametypeele =
          isOtherEnq(tmpId) &&
          tmpId.substring(0, 2) !== "09" &&
          ReqObj.Form[tmpId].FormSequence.StepCounter < 1
            ? "inline"
            : "";
        blenqGATracking(form_type,"Validation_Error_Name|" + StepNumber + "|ContactDetail",getEventLabel(),0,tmpId);
        that.handleUI({
          data: {
            tmpId: tmpId,
            elementhtml: "_fname_errmsg" + that.classCount,
            elementremoveClass: "_error_first_name" + that.classCount,
            elementaddClass: "_q_first_nm" + that.classCount,
            validate: validate,
            todo: "showError",
            formType: ReqObj.Form[tmpId].formType.toLowerCase(),
            chatelement: "_name-lb" + that.classCount,
            isinline: nametypeele,
          },
        });
        if (isSet(validate["specialcase"]) && validate["specialcase"] === true) {
          ReqObj.UserDetail["fn"] = "";
        }
        var err_obj = validate;
      }
    }
  
    if (that.usercountry === "IN") {
      if ($("#t" + tmpId + "_q_email_in" + that.classCount).length > 0) {
        var email_val = $("#t" + tmpId + "_q_email_in" + that.classCount).val();
        validate = validation.isEmailValid(email_val);
        if (!validate["type"]) {
          ReqObj.Form[tmpId].validateArray.push(
            "t" + tmpId + "_q_email_in" + that.classCount
          );
          var nametypeele =
            isOtherEnq(tmpId) &&
            tmpId.substring(0, 2) !== "09" &&
            ReqObj.Form[tmpId].FormSequence.StepCounter < 1
              ? "inline"
              : "";
          blenqGATracking(form_type,"Validation_Error_Email|" + StepNumber + "|ContactDetail",getEventLabel(),0,tmpId);
          that.handleUI({
            data: {
              tmpId: tmpId,
              elementhtml: "_email_errmsg" + that.classCount,
              elementremoveClass: "_err_email" + that.classCount,
              elementaddClass: "_q_email_in" + that.classCount,
              validate: validate,
              todo: "showError",
              formType: ReqObj.Form[tmpId].formType.toLowerCase(),
              chatelement: "_email-lb" + that.classCount,
              isinline: nametypeele,
            },
          });
          if (
            isSet(validate["specialcase"]) &&
            validate["specialcase"] === true
          ) {
            ReqObj.UserDetail["em"] = "";
          }
          err_obj = validate;
        }
      }
      if ($("#t" + tmpId + "_q_city_oth" + that.classCount).length > 0) {
        if (
          isSSB(tmpId) &&
          $("#t" + tmpId + "_q_city_oth" + that.classCount)
            .parent()
            .parent()
            .hasClass("cbl_vh")
        ) {
          return true;
        }
        validate = validation.isCityValid(
          $("#t" + tmpId + "_q_city_oth" + that.classCount).val()
        );
        if (!validate["type"]) {
          ReqObj.Form[tmpId].validateArray.push(
            "t" + tmpId + "_q_city_oth" + that.classCount
          );
          var nametypeele =
            isOtherEnq(tmpId) &&
            tmpId.substring(0, 2) !== "09" &&
            ReqObj.Form[tmpId].FormSequence.StepCounter < 1
              ? "inline"
              : "";
          blenqGATracking(form_type,"Validation_Error_City |" + StepNumber + "|ContactDetail",getEventLabel(),0,tmpId);
          that.handleUI({
            data: {
              tmpId: tmpId,
              elementhtml: "_city_errmsg" + that.classCount,
              elementremoveClass: "_error_city" + that.classCount,
              elementaddClass: "_q_city_oth" + that.classCount,
              validate: validate,
              todo: "showError",
              formType: ReqObj.Form[tmpId].formType.toLowerCase(),
              chatelement: "_for-city-lb" + that.classCount,
              isinline: nametypeele,
            },
          });
          if (
            isSet(validate["specialcase"]) &&
            validate["specialcase"] === true
          ) {
            ReqObj.UserDetail["cityname"] = "";
          }
          err_obj = validate;
        }
      }
    } else {
      if ($("#t" + tmpId + "_q_mobile_f").length > 0) {
        validate = validation.isMobileChValid(
          $("#t" + tmpId + "_q_mobile_f").val()
        );
        if (!validate["type"]) {
          var nametypeele =
            isOtherEnq(tmpId) && ReqObj.Form[tmpId].FormSequence.StepCounter < 1
              ? "inline"
              : "";
          that.handleUI({
            data: {
              tmpId: tmpId,
              elementhtml: "_mobile_errmsg" + that.classCount,
              elementremoveClass: "_error_mobile" + that.classCount,
              elementaddClass: "_q_mobile_f" + that.classCount,
              validate: validate,
              todo: "showError",
              formType: ReqObj.Form[tmpId].formType.toLowerCase(),
              chatelement: "_mobile-lb" + that.classCount,
              isinline: nametypeele,
            },
          });
          if (
            isSet(validate["specialcase"]) &&
            validate["specialcase"] === true
          ) {
            ReqObj.UserDetail["mb1"] = "";
          }
          err_obj = validate;
        }
      }
    }
    if (isSet(err_obj) && !err_obj["type"]) return false;
    else return true;
  };
  
  ContactDetail.prototype.getData = function (tmpId, which) {
    var that = this;
    this.cookies(tmpId);
    var formType = ReqObj.Form[tmpId].formType.toLowerCase();
    var data = {};
    var iso = currentISO();
    var cityid = usercookie.getParameterValue(this.imeshCookie, "ctid");
    var ctid =
      IsChatbl(tmpId) || isSSB(tmpId)
        ? ReqObj.Form[tmpId].UserInputs["CityId"]
        : ReqObj.UserDetail["ctid"];
    data["s_city_id"] = isSet(ctid) && ctid !== "" ? ctid : cityid;
    if (!isSet(data["s_city_id"]) || data["s_city_id"] === "") {
      ReqObj.Form[tmpId].cityOth =
        IsChatbl(tmpId) || isSSB(tmpId)
          ? ReqObj.Form[tmpId].UserInputs["City"]
          : ReqObj.UserDetail["ctoth"];
    }
    var name =
      IsChatbl(tmpId) || isSSB(tmpId)
        ? ReqObj.Form[tmpId].UserInputs["Name"]
        : ReqObj.UserDetail["fn"] !== ""
        ? ReqObj.UserDetail["fn"]
        : $(
            "#t" + tmpId + "_q_first_nm" + ReqObj.Form[tmpId].nec.classCount
          ).val();
    name = isSet(name) ? name.trim() : "";
    if (name) {
      if (name.indexOf(" ") !== -1) {
        var fn = name.substr(0, name.indexOf(" "));
        fn.trim();
        $("#t" + tmpId + "_q_first_nm_hidden").val(fn);
        var ln = name.substr(name.indexOf(" ") + 1);
      } else $("#t" + tmpId + "_q_first_nm_hidden").val(name);
    }
    data["s_first_name"] = isSet(fn) && fn !== "" ? fn : name;
    data["s_last_name"] = isSet(ln) && ln !== "" ? ln : "";
  
    if (iso === "IN") {
      data["s_email"] =
        IsChatbl(tmpId) || isSSB(tmpId)
          ? ReqObj.Form[tmpId].UserInputs["Email"]
          : ReqObj.UserDetail["em"];
      data["s_city_name"] =
        IsChatbl(tmpId) || isSSB(tmpId)
          ? ReqObj.Form[tmpId].UserInputs["City"]
          : ReqObj.UserDetail["cityname"];
      var primary = usercookie.getParameterValue(this.imeshCookie, "mb1");
      data["s_mobile"] =
        primary !== ""
          ? primary
          : IsChatbl(tmpId) || isSSB(tmpId)
          ? ReqObj.Form[tmpId].UserInputs["PrimaryInfo"]
          : ReqObj.UserDetail["mb1"];
    } else {
      data["s_mobile"] =
        IsChatbl(tmpId) || isSSB(tmpId)
          ? ReqObj.Form[tmpId].UserInputs["Mobile"]
          : ReqObj.UserDetail["mb1"]; // check for foreign users..
      var primary = usercookie.getParameterValue(this.imeshCookie, "em");
      data["s_email"] =
        primary !== ""
          ? primary
          : IsChatbl(tmpId) || isSSB(tmpId)
          ? ReqObj.Form[tmpId].UserInputs["PrimaryInfo"]
          : ReqObj.UserDetail["em"];
    }
    data["s_glusrid"] = usercookie.getParameterValue(this.imeshCookie, "glid");
    data["curr_page_url"] = window.location.href;
    data["s_ip"] = usercookie.getParameterValue(this.iplocCookie, "gip");
    data["s_ip_country"] = usercookie.getParameterValue(
      this.iplocCookie,
      "gcnnm"
    );
    data["s_ip_country_iso"] = this.geoip_country_iso;
    data["flag"] = ReqObj.Form[tmpId].formType;
    data["modid"] = ReqObj.Form[tmpId].modId;
    data["s_companyName"] =
      isSet(ReqObj.Form[tmpId].mdObjErr) &&
      $.inArray(0, ReqObj.Form[tmpId].mdObjErr) !== -1
        ? ""
        : isSet(ReqObj.Form[tmpId].companyName) &&
          ReqObj.Form[tmpId].companyName !== ""
        ? ReqObj.Form[tmpId].companyName
        : "";
    data["gst"] =
      isSet(ReqObj.Form[tmpId].gst.number) &&
      parseInt(ReqObj.Form[tmpId].gst.number) !== 0
        ? ReqObj.Form[tmpId].gst.number
        : "";
    data["url"] =
      isSet(ReqObj.Form[tmpId].mdObjErr) &&
      $.inArray(2, ReqObj.Form[tmpId].mdObjErr) !== -1
        ? ""
        : isSet(ReqObj.Form[tmpId].url.name) &&
          parseInt(ReqObj.Form[tmpId].url.name) !== ""
        ? ReqObj.Form[tmpId].url.name
        : "";
    data["s_country_iso"] =
      iso !== ""
        ? iso
        : usercookie.getParameterValue(usercookie.getCookie("iploc"), "gcniso");
    data["s_email"] =
      isSet(data["s_email"]) && data["s_email"].match(/\*/) !== null
        ? ""
        : data["s_email"];
    data["s_mobile"] =
      isSet(data["s_mobile"]) && data["s_mobile"].match(/\*/) !== null
        ? ""
        : data["s_mobile"];
    data["replica"] = {
      mobile: data["s_mobile"],
      email: data["s_email"],
      cname: data["s_companyName"],
      url: data["url"],
      name: data["s_first_name"],
      city: data["s_city_name"],
      gst: data["gst"],
    };
    return ObjectTrim(data);
  };
  
  function fireCityTracking(tmpId, data) {
    var imesh = imeshExist();
    var _case =
      imesh === ""
        ? 1
        : usercookie.getParameterValue(imesh, "ctid") === ""
        ? 1
        : 0;
    if (_case !== 0 &&isSet(data["s_city_name"]) &&data["s_city_name"] !== "" &&isSet(ReqObj.Form[tmpId].cityTracking)) {
      var form_type = ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
      if (ReqObj.Form[tmpId].cityTracking === 1)
        blenqGATracking(form_type, "City|Prefilled", getEventLabel(), 1, tmpId);
      else if (ReqObj.Form[tmpId].cityTracking === 2)
        blenqGATracking(form_type, "City|Suggestion", getEventLabel(), 1, tmpId);
      else if (ReqObj.Form[tmpId].cityTracking === 3)
        blenqGATracking(form_type, "City|Suggester", getEventLabel(), 1, tmpId);
      else if (ReqObj.Form[tmpId].cityTracking === 4)
        blenqGATracking(form_type,"City|GeoLocFilled",getEventLabel(),1,tmpId);
      else blenqGATracking(form_type, "City|Manual", getEventLabel(), 1, tmpId);
    }
  }
  
  ContactDetail.prototype.sendRequest = function (CDObject, tmpId, type) {
    var data = this.getData(tmpId);
    var iso = currentISO();
    var toFire = false;
    fireCityTracking(tmpId, data);
    if (
      (iso !== "IN" &&
        (data["s_first_name"] !== "" ||
          data["s_mobile"] !== "" ||
          data["url"] !== "" ||
          data["s_companyName"] !== "")) ||
      (iso === "IN" &&
        (data["s_first_name"] !== "" ||
          data["s_email"] !== "" ||
          data["s_city_name"] !== "" ||
          data["gst"] !== "" ||
          data["s_companyName"] !== ""))
    ) {
      toFire = true;
    }
    if (toFire) {
      var _data = this.multipleHitCases(data, type);
      data = isEnq(tmpId) || isBl(tmpId) ? _data.data : data;
      data["replica"] = "";
      data = ObjectTrim(data);
      fireAjaxRequest({
        data: {
          ga: {
            s: true,
            f: true,
            gatype: "GlusrUpdate",
            source: "",
          },
          tmpId: tmpId,
          ajaxObj: {
            obj: CDObject,
            s: {
              ss: 1,
              sf: {
                af: 0,
                pa: 1,
              },
              f: 1,
            },
            f: {
              f: 1,
            },
          },
          ajaxtimeout: 0,
          ajaxdata: data,
          hitfinserv: "",
          type: 6,
        },
      });
      if ((isEnq(tmpId) || isBl(tmpId)) && _data.hitagain === true) {
        this.sendRequest(CDObject, tmpId, "again");
      }
    }
  };
  ContactDetail.prototype.multipleHitCases = function (data, type, where) {
    var iso = currentISO();
    if (
      iso !== "IN" &&
      data.replica.mobile !== "" &&
      (typeof type === "undefined" || type === "url" || type === "noturl")
    ) {
      data["s_mobile"] = "";
      return { data: data, hitagain: where === "no" ? false : true };
    } else if (
      iso !== "IN" &&
      data.replica.mobile !== "" &&
      typeof type !== "undefined" &&
      type === "again"
    ) {
      data["s_first_name"] = "";
      data["url"] = "";
      data["s_companyName"] = "";
      data["s_email"] = data.replica.email;
      data["s_mobile"] = data.replica.mobile;
      return { data: data, hitagain: false };
    } else if (
      iso === "IN" &&
      data.replica.gst !== "" &&
      type === "again" &&
      where === "notgst"
    ) {
      data["gst"] = "";
      return { data: data, hitagain: true };
    } else if (
      iso === "IN" &&
      data.replica.gst !== "" &&
      typeof type === "undefined"
    ) {
      data["s_mobile"] = data.replica.mobile;
      data["s_first_name"] = "";
      data["s_email"] = "";
      data["s_city_name"] = "";
      data["s_companyName"] = "";
      data["gst"] = data.replica.gst;
      return { data: data, hitagain: false };
    }
    return { hitagain: false, data: data, remove: "none" };
  };
  ContactDetail.prototype.handleEvents = function (obj, tmpId) {
    if (!isSet(validation)) createGlobalObject();
    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    ) {
      //  ChatblfooterAns(tmpId);
      //if (IsChatbl(tmpId) || isSSB(tmpId)) {
      obj.enableCity({
        data: {
          obj: obj,
          tmpId: tmpId,
        },
      });
      //}
      /*------------------ FOCUS ---------------------- */
      var nametypeele =
        isOtherEnq(tmpId) &&
        tmpId.substring(0, 2) !== "09" &&
        ReqObj.Form[tmpId].FormSequence.StepCounter < 1
          ? "inlinename"
          : "";
      var nameplaceholder = IsChatbl(tmpId)
        ? " Enter your Name"
        : "Enter your Name";
  
      var validationevent = isSSB(tmpId) ? "click" : "focus keypress.Validation";
      $("#t" + tmpId + "_q_first_nm" + obj.classCount)
        .off(validationevent)
        .on(
          validationevent,
          {
            obj: obj,
            todo: "removeError",
            tmpId: tmpId,
            ele: "_q_first_nm" + obj.classCount,
            errorlabel: "_name-lb" + obj.classCount,
            errorMainDiv: "_fname_errmsg" + obj.classCount,
            errorSubDiv: "_error_first_name" + obj.classCount,
            typeele: nametypeele,
            placehold: nameplaceholder,
          },
          obj.handleUI
        );
      $("#t" + tmpId + "_q_city_oth" + obj.classCount)
        .off("focus keypress.Validation")
        .on(
          "focus keypress.Validation",
          {
            obj: obj,
            todo: "removeError",
            tmpId: tmpId,
            ele: "_q_city_oth" + obj.classCount,
            errorlabel: "_for-city-lb" + obj.classCount,
            errorMainDiv: "_city_errmsg" + obj.classCount,
            errorSubDiv: "_error_city" + obj.classCount,
            typeele: "city",
          },
          obj.handleUI
        );
      $("#t" + tmpId + "_q_email_in" + obj.classCount)
        .off("focus keypress.Validation")
        .on(
          "focus keypress.Validation",
          {
            obj: obj,
            todo: "removeError",
            tmpId: tmpId,
            ele: "_q_email_in" + obj.classCount,
            errorlabel: "_email-lb" + obj.classCount,
            errorMainDiv: "_email_errmsg" + obj.classCount,
            errorSubDiv: "_err_email" + obj.classCount,
            typeele: "email",
          },
          obj.handleUI
        );
      $("#t" + tmpId + "_q_mobile_f" + obj.classCount)
        .off("focus.Validation")
        .on(
          "focus.Validation",
          {
            obj: obj,
            todo: "removeError",
            tmpId: tmpId,
            ele: "_q_mobile_f" + obj.classCount,
            errorlabel: "_mobile-lb" + obj.classCount,
            errorMainDiv: "_mobile_errmsg" + obj.classCount,
            errorSubDiv: "_error_mobile" + obj.classCount,
          },
          obj.handleUI
        );
  
      /*---------------- BLUR ----------------------- */
      $("#t" + tmpId + "_q_first_nm" + obj.classCount)
        .off("blur")
        .on(
          "blur",
          {
            obj: obj,
            todo: "blurlabel",
            tmpId: tmpId,
            ele: "_q_first_nm" + obj.classCount,
            placehold: nameplaceholder,
            typeele: nametypeele,
          },
          obj.handleUI
        );
      $("#t" + tmpId + "_q_city_oth" + obj.classCount)
        .off("blur")
        .on(
          "blur",
          {
            obj: obj,
            todo: "blurlabel",
            tmpId: tmpId,
            ele: "_q_city_oth" + obj.classCount,
          },
          obj.handleUI
        );
      $("#t" + tmpId + "_q_email_in" + obj.classCount)
        .off("blur")
        .on(
          "blur",
          {
            obj: obj,
            todo: "blurlabel",
            tmpId: tmpId,
            ele: "_q_email_in" + obj.classCount,
          },
          obj.handleUI
        );
      $("#t" + tmpId + "_q_mobile_f" + obj.classCount)
        .off("blur")
        .on(
          "blur",
          {
            obj: obj,
            todo: "blurlabel",
            tmpId: tmpId,
            ele: "_q_mobile_f" + obj.classCount,
          },
          obj.handleUI
        );
  
      /*---------------Others----------------------- */
      $("#t" + tmpId + "_detect_city" + obj.classCount)
        .off("click")
        .on(
          "click",
          {
            obj: obj,
            tmpId: tmpId,
          },
          obj.detectCity
        );
      $("#t" + tmpId + "_q_mobile_f" + obj.classCount)
        .off("keypress.Validation")
        .on("keypress.Validation", validation.isNumberKey);
  
      if (IsChatbl(tmpId)) {
        $("#t" + tmpId + "_q_first_nm" + obj.classCount).focus();
      }
    }
  };
  ContactDetail.prototype.handleUI = function (event) {
    if (isSet(event) && isSet(event.data)) {
      var keycode = event.keyCode ? event.keyCode : event.which;
      if (keycode !== 13) {
        var obj = event.data.obj;
        var todo = event.data.todo;
        var tmpId = event.data.tmpId;
        if (todo === "nameUI") {
          if ($("#t" + tmpId + "_q_first_nm" + obj.classCount).val() !== "") {
            $("#t" + tmpId + "_q_first_nm" + obj.classCount).prop(
              "disabled",
              false
            );
            $("#t" + tmpId + "_q_first_nm" + obj.classCount).prop(
              "readonly",
              true
            );
          }
          $("#t" + tmpId + "_q_first_nm" + obj.classCount)
            .parent()
            .removeClass("eqIsf eqIsMn");
          if (isEnq(tmpId))
            $("#t" + tmpId + "_q_first_nm" + obj.classCount)
              .parent()
              .addClass("mb15");
        }
        if (todo === "default") {
          if ($("#t" + tmpId + "_q_city_oth" + obj.classCount).val() !== "") {
            $("#t" + tmpId + "_q_city_oth" + obj.classCount)
              .parents()
              .addClass("eqfcsed");
          }
        }
        if (todo === "focus") {
          if (IsChatbl(tmpId)) {
            setTimeout(function () {
              $("#t" + tmpId + "_q_first_nm" + obj.classCount).focus();
              $("#t" + tmpId + "_q_city_oth" + obj.classCount).focus();
              $("#t" + tmpId + "_q_mobile_f" + obj.classCount).focus();
              $("#t" + tmpId + "_q_email_in" + obj.classCount).focus();
            }, 1800);
          } else {
            $("#t" + tmpId + "_q_first_nm" + obj.classCount).focus();
            $("#t" + tmpId + "_q_city_oth" + obj.classCount).focus();
            $("#t" + tmpId + "_q_mobile_f" + obj.classCount).focus();
          }
        }
        if (todo === "removeError") {
          removechatblerror(tmpId);
          $("#t" + tmpId + event.data.errorSubDiv).addClass("bedsnone");
          $("#t" + tmpId + event.data.ele).removeClass(
            "highlight-err mb-erbrd nb-erbrd"
          );
          $("#t" + tmpId + event.data.errorlabel).removeClass("redc");
          $("#t" + tmpId + event.data.ele)
            .parents()
            .addClass("eqfcsed"); //
          if (event.data.typeele === "city" && keycode !== 0)
            ReqObj.Form[tmpId].cityTracking = 0;
          if (isOtherEnq(tmpId)) {
            if (isSet(event.data.typeele) && event.data.typeele === "email")
              $("#t" + tmpId + event.data.ele).attr(
                "placeholder",
                "For Example, abc@gmail.com"
              );
            else if (
              isSet(event.data.typeele) &&
              event.data.typeele === "inlinename"
            )
              $("#t" + tmpId + event.data.ele).attr(
                "placeholder",
                event.data.placehold
              );
            else $("#t" + tmpId + event.data.ele).attr("placeholder", "");
          }
          if (keycode === 8) {
            var retval = ModifyUserDetail(event.data.toupdate, "empty", keycode);
            if (retval === 1) {
              $("#t" + tmpId + "city_id_sugg" + obj.classCount).val("");
            }
          }
        }
  
        if (todo === "blurlabel") {
          if (isOtherEnq(tmpId)) {
            if ($("#t" + tmpId + event.data.ele).val().length === 0)
              $("#t" + tmpId + event.data.ele)
                .parents()
                .removeClass("eqfcsed");
            if (isSet(event.data.typeele) && event.data.typeele === "inlinename")
              $("#t" + tmpId + event.data.ele).attr(
                "placeholder",
                event.data.placehold
              );
            else $("#t" + tmpId + event.data.ele).attr("placeholder", "");
          }
        }
  
        if (todo === "cityOthers") {
          $("#t" + tmpId + "_q_city_oth" + obj.classCount).val(
            ReqObj.Form[tmpId].cityOth
          );
          $("#t" + tmpId + "_q_city_oth" + obj.classCount).prop(
            "disabled",
            false
          );
        }
        if (todo === "showError") {
          $("#t" + tmpId + event.data.elementhtml).html(
            event.data.validate["error"]
          );
          if (IsChatbl(tmpId)) {
            addChatblError(tmpId, event.data.validate["error"]);
          } else {
            $("#t" + tmpId + event.data.elementremoveClass).removeClass(
              "bedsnone"
            );
            if (!ReqObj.Form[tmpId].errorDivId)
              ReqObj.Form[tmpId].errorDivId =
                "t" + tmpId + event.data.elementremoveClass;
            var errorcls = isSSB(tmpId)
              ? isnewSSB(tmpId)
                ? "nb-erbrd"
                : "mb-erbrd"
              : "highlight-err";
            $("#t" + tmpId + event.data.elementaddClass).addClass(errorcls);
            isSSB(tmpId)
              ? $("#t" + tmpId + event.data.elementaddClass).focus
              : "";
            if (
              !isSSB(tmpId) &&
              (!isOtherEnq(tmpId) ||
                (isSet(event.data.isinline) && event.data.isinline === "inline"))
            )
              $("#t" + tmpId + event.data.chatelement).addClass("redc");
          }
        }
      }
    }
  };
  
  ContactDetail.prototype.EventIfScreenPresent = function (tmpId) {
    if (isOtherEnq(tmpId)) {
      this.handleHeading(tmpId);
      ButtonNameUI("isq", tmpId);
    }
  };
  
  ContactDetail.prototype.handleHeading = function (tmpId) {
    if (ReqObj.Form[tmpId].OnCloseStep === true) {
      ReqObj.Form[tmpId].currentScreen =
        currentISO() === "IN"
          ? this.className + "onclosein"
          : this.className + "onclosenotin";
    }
    if (isSet(this.onlastscreen) && this.onlastscreen && isBl(tmpId)) {
      ReqObj.Form[tmpId].currentScreen =
        currentISO() === "IN" ? this.className + "_last" : this.className;
    }
    if (ReqObj.Form[tmpId].formType.toLowerCase() !== "enq")
      $("#t" + tmpId + "_hdg")
        .removeClass("bedsnone")
        .html(getFormHeading(tmpId, ReqObj.Form[tmpId].currentScreen));
    else {
      if (isSet(this.type) && this.type.step === "last") {
        ReqObj.Form[tmpId].currentScreen =
          currentISO() === "IN"
            ? this.className + "onclosein"
            : this.className + "onclosenotin";
      }
      if (
        isImageVidEnq(tmpId) &&
        ReqObj.Form[tmpId].FormSequence.StepCounter ===
          0 /*&& !((new RegExp('contactdetail').test(ReqObj.Form[tmpId].currentScreen.toLowerCase())) || (new RegExp('userlogin').test(ReqObj.Form[tmpId].currentScreen.toLowerCase())))*/
      )
        $("#t" + tmpId + "_hdg")
          .addClass("bedsnone")
          .html("");
      else
        $("#t" + tmpId + "_hdg")
          .removeClass("bedsnone")
          .html(getFormHeading(tmpId, ReqObj.Form[tmpId].currentScreen));
    }
  };
  
  ContactDetail.prototype.handleButton = function (tmpId) {
    ButtonNameUI(ReqObj.Form[tmpId].currentScreen, tmpId);
  };
  
  ContactDetail.prototype.enableCity = function (event) {
    if (isSet(event) && isSet(event.data)) {
      var obj = event.data.obj;
      var tmpId = event.data.tmpId;
      //var cityvalue = $("#" +tmpId + "_q_city_oth").val();
      // if(!isSSB(tmpId)) $("#t" + tmpId + "_q_city_oth" + obj.classCount).val("");
      // $("#t" + tmpId + "_q_city_oth" + obj.classCount).prop("disabled", false);
      // $("#t" + tmpId + "_q_city_oth" + obj.classCount).prop("readonly", false);
      // if(!isSSB(tmpId))$("#t" + tmpId + "_q_city_oth" + obj.classCount).focus();
      $("#t" + tmpId + "_detect_city" + obj.classCount).off("click");
      obj.showCitySuggestions(obj, tmpId);
    }
  };
  ContactDetail.prototype.detectCity = function (event) {
    if (isSet(event) && isSet(event.data)) {
      var obj = event.data.obj;
      var tmpId = event.data.tmpId;
      var form_type =
        ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
      blenqGATracking(form_type, "detectMyCity", getEventLabel(), 1, tmpId);
      ReqObj.cityId = [];
      ReqObj.cityId.push("#t" + tmpId + "_q_city_oth" + obj.classCount); //t0901city_id_sugg1
      ReqObj.cityId.push("#t" + tmpId + "city_id_" + obj.classCount);
      initGeolocationenq(tmpId);
    }
  };
  ContactDetail.prototype.showCitySuggestions = function (obj, tmpId) {
    var that = this;
    var iso = obj.usercountry;
    if (typeof Suggester === "undefined") {
      setTimeout(function () {
        that.showCitySuggestions(obj, tmpId);
      }, 50);
    } else {
      if (typeof Suggester !== "undefined") {
        var CitySuggSuffix = "_CitySuggestor";
        $(".t" + tmpId + CitySuggSuffix).each(function () {
          $(this).remove();
        });
        var row_num = BlAutoSuggRowNum(tmpId);
        var autocompleteClass = SetAutoCompleteClass(tmpId, CitySuggSuffix);
        if (IsChatBLInline(tmpId)) autocompleteClass += " smChtSg";
        main_city_sugg = new Suggester({
          element: "t" + tmpId + "_q_city_oth" + obj.classCount,
          onSelect: obj.selectCity,
          type: "city",
          fields: "std,state,id,stateid",
          minStringLengthToDisplaySuggestion: 1,
          rowsToDisplay: row_num,
          autocompleteClass: autocompleteClass,
          displayFields: "value,state",
          displaySeparator: " >> ",
          filters: "iso:" + iso,
          recentData: false,
          rowsToDisplay: IsChatBLInline(tmpId) ? 3 : "",
        });
      }
    }
  };
  ContactDetail.prototype.selectCity = function (event, ui) {
    var tmpId = $(this).attr("templateId");
    var classCount = returnObjectSize(ReqObj.Form[tmpId].ContactDetail);
    $("#t" + tmpId + "_q_city_oth" + classCount).val(ui.item.value);
    $("#t" + tmpId + "city_id_sugg" + classCount).val(ui.item.data.id);
    ReqObj.UserDetail["statename"] = ui.item.data.state;
    ReqObj.UserDetail["stateid"] = ui.item.data.stateid;
    ReqObj.UserDetail["ctid"] = ui.item.data.id;
    ReqObj.UserDetail["cityname"] = ui.item.value;
    if (IsChatbl(tmpId)) {
      ReqObj.Form[tmpId].UserInputs["City"] = ui.item.value;
      ReqObj.Form[tmpId].UserInputs["CityId"] = ui.item.data.id;
    }
    ReqObj.Form[tmpId].cityTracking = 3;
  };
    
  function flagDetach(tmpId) {
    if ($("#t" + tmpId + "flagdiv2").length > 0) {
      var ele = $("#t" + tmpId + "country_dropd").detach();
      $("#t" + tmpId + "flagdiv2").append(ele);
    }
  }
  
  function addDetachedFlag(tmpId) {
    if (isSet(tmpId) && tmpId !== "") {
      flagDetach(tmpId);
    } else {
      var arr = template_array;
      var len = arr.length;
      for (var i = 0; i < len; i++) {
        flagDetach(arr[i]);
      }
    }
  }
  
  function detachFlag2(tmpId) {
    var ele = $("#t" + tmpId + "country_dropd").detach();
    $("#t" + tmpId + "flagdiv2").append(ele);
  }
  
  function FlagSuggestor() {
    this.tmpId = "";
    this.fromwhere = "";
    this.hitObject = {};
  }
  
  var filterFunction = function (event) {
    var tmpId = event.target.name;
    var eleId = "t" + tmpId + "country_dropd";
    var flagId = "t" + tmpId + "_flagInput";
    var input = document.getElementById(flagId);
    var filter = input.value.toUpperCase();
    var div = document.getElementById(eleId);
    var a = div.getElementsByTagName("li");
  
    for (var i = 0; i < a.length; i++) {
      var txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  };
  
  var addScrollingInDdBl = function (eleId) {
    var d = "";
    $("#" + eleId + " div ul li").click(function () {
      return (
        (d = $("#" + eleId + " div ul li").index(this)),
        $("#" + eleId + " div ul li").removeClass("selected"),
        $("#" + eleId + " div ul li:eq(" + d + ")").addClass("selected"),
        $("#" + eleId)
          .children("div")
          .hide()
      );
    });
  };
  
  var activateDropDownBl = function (eleId) {
    $("#" + eleId + " dt a").click(function () {
      document.getElementById(eleId).getAttribute("disabled") ||
        ($("#" + eleId)
          .children("div")
          .toggle(),
        $("#" + eleId + " ul li:first-child").focus());
    });
    $(document).bind("click", function (e) {
      var t = $(e.target);
      if (t.context.id.substr(6) === "flagInput") return;
      t.parents().hasClass("dropdown") ||
        $("#" + eleId)
          .children("div")
          .hide();
    });
  };
  
  var flagRes = function (tmpId) {
    ReqObj.Form[tmpId].flagSuggCalledOnce = true;
    var eleId = "t" + tmpId + "country_dropd";
    var current_iso = currentISO();
    var countryText = "";
    var countryUi = "";
  
    $.each(flagResList, function (t) {
      flagResList[t].id = tmpId;
      if (isSet(flagResList[t].data.iso) && current_iso.toLowerCase() === flagResList[t].data.iso.toLowerCase()) {
        countryUi = flagResList[t];
      }
      countryText +=
        "<li onclick='javascript:setCountryISO(event," +
        JSON.stringify(flagResList[t]).replace(/'/g, "\xE2\u20AC\u2122") +
        ")'><span style=\"background-position:0px -" +
        11 * flagResList[t].data.icon_order +
        'px"></span><a>' +
        flagResList[t].label +
        "</a></li>";
    });
  
    $("#" + eleId + " ul").append(countryText);
  
    addScrollingInDdBl(eleId);
  
    if (isSet(ReqObj.Form[tmpId].flags)) {
      ReqObj.Form[tmpId].flags.isFlagSuggSet = true;
    }
  
    setCountryISO(undefined, countryUi);
  };
  
  FlagSuggestor.prototype.setFlagSuggestor = function (tmpId, fromwhere) {
    var that = this;
    that.tmpId = tmpId;
    that.fromwhere = fromwhere;
    var eleId = "t" + tmpId + "country_dropd";
    ReqObj["showcountry"] = false;
  
    addTemplates(tmpId, template_array);
  
    if (imeshExist() === "") {
      if (
        fromwhere !== "load" &&
        isSet(that.hitObject) &&
        isSet(that.hitObject[tmpId]) &&
        that.hitObject[tmpId] === true
      )
        return;
      else {
        if (
          fromwhere === "load" &&
          isSet(that.hitObject) &&
          isSet(that.hitObject[tmpId]) &&
          that.hitObject[tmpId] === true &&
          ReqObj["showcountry"]
        )
          return;
        else that.hitObject[tmpId] = true;
      }
  
      if (!$("#" + eleId).html()) {
        var dropdownText =
          '<dt><a><span></span><div class="as_arrow"></div></a><span class="value" ></span></dt>';
        dropdownText +=
          "<div class=\"eqAts\"><input type='text' name='" +
          tmpId +
          "' placeholder='Search..' onkeyup='javascript:filterFunction(event)' id='t" +
          tmpId +
          "_flagInput'><ul></ul></div>";
        $("#" + eleId).append(dropdownText);
  
        flagRes(tmpId);
        activateDropDownBl(eleId);
      }
    }
  };
  
  function savelogin(tmpid, ui) {
    if (
      isSet(ui["data"].iso) && ui["data"].iso != "IN" &&
      $("#t" + tmpid + "_login_field")
        .attr("placeholder")
        .includes("email") &&
      notempty("#t" + tmpid + "_login_field")
    ) {
      savenem(tmpid);
    } else {
      ReqObj.Form[tmpid]["savevalue"] = { flogin: "" };
      ReqObj.Form[tmpid]["savevalue"]["fname"] = "";
    }
  }
  
  function saveQuantity(tmpid) {
    var qun = "",
      qununit = "";
    if (notempty("#t" + tmpid + "txtbx_option1")) {
      qun = $("#t" + tmpid + "txtbx_option1").val();
      qununit = $("#t" + tmpid + "txtbx_option2").val();
    }
    ReqObj.Form[tmpid].userFilledIsq = [
      { questionsDesc: "Quantity", optionsValue: qun },
      { questionsDesc: "Quantity Unit", optionsValue: qununit },
    ];
  }
  
  function notempty(id) {
    return isSet($(id).length) && $(id).val() != "";
  }
  
  function rvalue(tmpId, id) {
    if (
      isSet(ReqObj.Form[tmpId]["savevalue"]) &&
      isSet(ReqObj.Form[tmpId]["savevalue"][id]) &&
      ReqObj.Form[tmpId]["savevalue"][id] != ""
    ) {
      var loginv = ReqObj.Form[tmpId]["savevalue"][id];
      ReqObj.Form[tmpId]["savevalue"][id] = "";
      return loginv;
    } else return "";
  }
  function savemc(tmpid) {
    ReqObj.Form[tmpid]["savevalue"]["evalue"] = $("#t" + tmpid + "_q_email_in1")
      .length
      ? $("#t" + tmpid + "_q_email_in1").val()
      : "";
    ReqObj.Form[tmpid]["savevalue"]["cvalue"] = $("#t" + tmpid + "_q_city_oth1")
      .length
      ? $("#t" + tmpid + "_q_city_oth1").val()
      : "";
  }
  function savenem(tmpid) {
    ReqObj.Form[tmpid]["savevalue"] = {
      flogin: $("#t" + tmpid + "_login_field").length
        ? $("#t" + tmpid + "_login_field").val()
        : "",
    };
    ReqObj.Form[tmpid]["savevalue"]["fname"] = $("#t" + tmpid + "_q_first_nm1")
      .length
      ? $("#t" + tmpid + "_q_first_nm1").val()
      : "";
    if (isSSB(tmpid)) {
      ReqObj.Form[tmpid]["savevalue"]["mobval"] = $("#t" + tmpid + "_q_mobile_f1")
        .length
        ? $("#t" + tmpid + "_q_mobile_f1").val()
        : "";
    }
  }
  function setCountryISO(revent, ui) {
    var that = flagsugg;
    if (isSet(ui["data"]) && isSet(ui["data"].cname))
      ReqObj["CountryName"] = ui["data"].cname;
    // js errors t.data is undefined and can't read undefined reading cname
    if (isSet(revent) && isSet(revent.type) && revent.type == "click") {
      var tmid = ui.id;
      if (isBl(tmid) || isSSB(tmid)) {
        savelogin(tmid, ui);
        if (Bl01(tmid)) saveQuantity(tmid);
      }
    }
    that.setCountry(revent, ui);
    // if(!isSet(revent) && ui["data"].cname != "India" && ReqObj.setflag)
    if (
      !isSet(revent) &&
      isSet(ui["data"]) &&
      ui["data"].cname != "India" &&
      ReqObj.setflag
    ) {
      revent = { type: "click" };
      ReqObj.setflag = 0;
    }
    if (isSet(revent) && revent.type === "click") that.sequenceUpdate(revent, ui);
  }
  FlagSuggestor.prototype.setCountry = function (event, ui) {
    /* loop over templates to update the flag */
    var that = flagsugg;
    var len = isSet(template_array) ? template_array.length : 0;
    for (var i = 0; i < len; i++) {
      // if(!isSet(event)&&ui["data"].cname=="India"&&ReqObj.Form[template_array[i]]["flagcalling"]!=0){
      //     //this.valuesOnSelecting(template_array[i], ui);
      //     continue;}
  
      // ReqObj.Form[template_array[i]]["flagcalling"]++;
      that.selectCountryISO(template_array[i], ui);
      //if(!isSet(event))setCountryName(template_array[i]);
    }
  };
  FlagSuggestor.prototype.sequenceUpdate = function (event, ui) {
    /* sequence is updated, html will be formed again and suggestor will be called again as "load" */
  
    var toCheck = false;
    if (!imeshExist()) {
      ReqObj.TempName = "";
    }
    var len = isSet(template_array) ? template_array.length : 0;
    var isDetachCalled = false;
    for (var i = 0; i < len; i++) {
      if (isDetachCalled === false) {
        addDetachedFlag();
        isDetachCalled = true;
      }
      var id = template_array[i];
      //if ((Bl09(id) || Enq09(id)) && $("#t" + id + "flagdiv2").length) detachFlag2(id);
      if ($.inArray(template_array[i].substring(0, 2), BlPopup) === -1) {
        ReqObj.Form[template_array[i]].flags.isFlagSuggSet = false;
        //addBlLoader(template_array[i], "left"); /* when user changes from suggestor - loader must be shown check code */
        formToUpdate(template_array[i], "changeflag");
      }
      if (
        (template_array[i].substring(0, 2) === "09" &&
          $("#t" + template_array[i] + "_bewrapper").length > 0 &&
          $("#t" + template_array[i] + "_bewrapper").css("display") ===
            "block") ||
        template_array[i].substring(0, 2) === "08"
      ) {
        ReqObj.Form[template_array[i]].flags.isFlagSuggSet = false;
        // var clickid = isSet(event.path) ? event.path[4].id : event.explicitOriginalTarget.parentElement.parentElement.parentElement.parentElement.id;
        // ReqObj.Form[template_array[i]].flag_track = clickid.includes("country_dropd") ? 2 : 1;
        addBlLoader(template_array[i], "left");
        AfterFormDefaults(template_array[i], "changeflag");
        // OpenForm(ReqObj.Form[template_array[i]]);
      }
    }
  };
  FlagSuggestor.prototype.selectCountryISO = function (tmpId, ui) {
    var that = this;
    var formType = ReqObj.Form[tmpId].formType.toLowerCase();
    if (isSet(ui["data"]) && isSet(ui["data"].cname))
      ReqObj["CountryName"] = ui["data"].cname;
    // js errors t.data is undefined and can't read undefined reading cname
    if (isSet(ui["data"]) && isSet(ui["data"].icon_order))
      //js error cannot read properties of undefined (reading 'icon_order')
      $("#t" + tmpId + "flag dt a span").attr(
        "style",
        "background-position:0px -" + ui.data.icon_order * 11 + "px"
      ); /*  */
    that.valuesOnSelecting(tmpId, ui); /* On select values are updated */
    if (!isSet(validation)) createGlobalObject();
    if (ui.value) {
      var text = ui.data.cname === "India" ? "Mobile" : "Email";
      var maxlength = ui.data.cname === "India" ? "10" : "";
      var labeltext = ui.data.cname === "India" ? isBlInlineFr(tmpId) ? text + " Number*" : text + " Number" : isBlInlineFr(tmpId) ? text + " ID*" : text + " ID"; //adwords_ch
      if(pdpInactiveBL(tmpId)){
        labeltext = ui.data.cname === "India" ? text + " Number <span class='redc'>*</span>" : text + " ID <span class='redc'>*</span>";
      }
      var label = IsChatbl(tmpId) ? "Okay, Please Share your " + labeltext : labeltext;
      var placeholder = "Enter your " + text.toLowerCase();
      if (!IsChatbl(tmpId)) {
        var helpmsg = ui.data.cname === "India" ? "number" : "email";
        $("#t" + tmpId + "_helpmsg").html(
          "Seller will contact you on this " + helpmsg
        );
      }
      pdpenqImage(tmpId) ? "" : $("#t" + tmpId + "_label-l").html(label);
      $("#t" + tmpId + "_login_field").attr("placeholder", placeholder);
      $("#t" + tmpId + "_login_field").attr("maxlength", maxlength);
      $("#t" + tmpId + "_login_field").val("");
  
      if (isSet(ui.data) && ui.data.cname === "India") {
        if (Enq04(tmpId)) $("#t" + tmpId + "_pdpPimg").removeClass("frUsr");
        if (isBlInlineFlag(tmpId)) {
          $("#t" + tmpId + "_blin").removeClass("flgn");
          $("#t" + tmpId + "_dliso").removeClass("bedsnone");
        }
        if (
          (tmpId.substring(0, 2) === "09" ||
            (tmpId.substring(0, 2) === "04" && isEnq(tmpId))) &&
          isSet(ReqObj.Form[tmpId].nec) &&
          isSet(ReqObj.Form[tmpId].nec.classCount)
        )
          $(
            "#t" + tmpId + "_contactinfo" + ReqObj.Form[tmpId].nec.classCount
          ).addClass("bedsnone");
        ReqObj.Form[tmpId].isTNCShownOnFirstStep = false;
        $("#t" + tmpId + "_iso")
          .attr("value", ReqObj.isoFlag)
          .removeClass("bedsnone");
        $("#t" + tmpId + "_tCond").addClass("bedsnone");
        if (!IsChatbl(tmpId) && !isSSB(tmpId)) {
          var clr =
            isGlIdEven(tmpId) && tmpId.substr(0, 2) === "01"
              ? ""
              : isImageVidEnq(tmpId)
              ? ""
              : "background-color : rgb(0, 166, 153)";
          $("#t" + tmpId + "_submit")
            .removeAttr("disabled")
            .attr("style", clr);
        }
        // $("#t" + tmpId + "_submitdiv").attr("class", "befstgo");
        $("#t" + tmpId + "_login_field")
          .on("keypress", validation.isNumberKey)
          .removeClass("highlight-err")
          .removeClass("beemail");
        $("#t" + tmpId + "_msg_primary_info_err_login").addClass("bedsnone");
      } else {
        if (isBlInlineFlag(tmpId)) {
          $("#t" + tmpId + "_blin").addClass("flgn");
          //$("#t" + tmpId + "_dliso").addClass("bedsnone");
        }
        if (Enq04(tmpId)) $("#t" + tmpId + "_pdpPimg").addClass("frUsr");
        if (
          (tmpId.substring(0, 2) === "09" || tmpId.substring(0, 2) === "04") &&
          isSet(ReqObj.Form[tmpId].nec) &&
          isSet(ReqObj.Form[tmpId].nec.classCount)
        )
          $(
            "#t" + tmpId + "_contactinfo" + ReqObj.Form[tmpId].nec.classCount
          ).removeClass("bedsnone");
        $("#t" + tmpId + "clslog").addClass("eqFrUs");
        $("#t" + tmpId + "_iso").addClass("bedsnone");
        if (
          (isEnq(tmpId) || isBl(tmpId)) &&
          isSet(ReqObj.Form[tmpId].nec) &&
          $("#t" + tmpId + "_q_mobile_f" + ReqObj.Form[tmpId].nec.classCount)
            .length > 0
        )
          $("#t" + tmpId + "_iso")
            .attr("value", ReqObj.isoFlag)
            .removeClass("bedsnone");
        ReqObj.Form[tmpId].isTNCShownOnFirstStep = true;
        ShowHideTNC(tmpId);
        $("#t" + tmpId + "_login_field")
          .off("keypress")
          .removeClass("highlight-err")
          .addClass("beemail");
        $("#t" + tmpId + "_msg_primary_info_err_login").addClass("bedsnone");
  
        if (IsChatbl(tmpId)) {
          $("#t" + tmpId + "flag").removeClass("bedsnone");
        }
        if (isSSB(tmpId)) foreignUserTransition(tmpId, ui.data.iso);
      }
      if (IsChatbl(tmpId)) {
        ShowHideTNC(tmpId);
      }
    }
  };
  FlagSuggestor.prototype.valuesOnSelecting = function (tmpId, ui) {
    var that = this;
    if(isSet(ui.data) && isSet(ui.data.iso) && isSet(ui.data.cname)) //js errors
      UpdateISO(ui.data.iso, ui.data.cname); /* updating ISO */
    if(isSet(ui.value)){
    ReqObj.isoFlag =
      ui.value.substring(0, 1) === "+"
        ? ui.value
        : "+" + ui.value; /* mobile field user phcc */
    }
  };
  function UpdateISO(iso, countryName) {
    ReqObj.changeUserIso = iso;
    ReqObj.changeUserCountry = countryName;
  }
    
  function closeFormCond(tmpId) {
    return (isEnq(tmpId) || isBl(tmpId)) &&
      (!ReqObj.Form[tmpId].generationCalled ||
        !$("#t" + tmpId + "_thankDiv").hasClass("bedsnone"))
      ? true
      : false;
  }
  
  function setCountryName(tmpId) {
    if (isSet(ReqObj["CountryName"]) && $("#t" + tmpId + "country").length) {
      var ele = $("#t" + tmpId + "country_dropd").detach();
      if (ReqObj["CountryName"].includes("Lao People"))
        $("#t" + tmpId + "country").text("Lao People's Democratic Republic");
      else $("#t" + tmpId + "country").text(ReqObj["CountryName"]);
      $("#t" + tmpId + "country").append(ele);
      if ($("#t" + tmpId + "country").height() > 18) {
        $("#t" + tmpId + "country").addClass("eHcnty");
      } else {
        $("#t" + tmpId + "country").removeClass("eHcnty");
      }
    }
  }  
  
  
  function FormCloseStep(tmpId, event) {
    var form_type =ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : (pdpInactiveBL(tmpId))? "Post Buy Leads New" : "Post Buy Leads";
    var that = ReqObj.Form[tmpId].FormSequence || {};
    var hasBedsnone = $("#t" + tmpId + "_thankDiv").hasClass("bedsnone");
    var ClassesforTracking = "CloseStep:";
    ReqObj.Form[tmpId].IsthroughClosebtn = true;
    if (ReqObj.Form[tmpId].IsbackClicked === true) {
      ReqObj.Form[tmpId].IsbackClicked = false;
      that.StepCounter += 1;
    }
    if (!ReqObj.Form[tmpId].generationCalled || !hasBedsnone) {
      if (!ReqObj.Form[tmpId].generationCalled) {
        if (that.StepCounter > -1) {
          ClassesforTracking += that.StepCounter + 1 + ":";
          if (isSet(ReqObj.Form[tmpId].UiArray[that.StepCounter])) {
            for (var i = 0;i < ReqObj.Form[tmpId].UiArray[that.StepCounter].length;i++) {
              if (i < ReqObj.Form[tmpId].UiArray[that.StepCounter].length &&i > 0)
                ClassesforTracking += "-";
              ClassesforTracking += ConstructorName(ReqObj.Form[tmpId].UiArray[that.StepCounter][i].Obj);
            }
          }
          blenqGATracking(form_type,ClassesforTracking,getEventLabel(),0,tmpId);
          CloseForm(tmpId);
        } else {
          CloseForm(tmpId);
        }
      } else if (!hasBedsnone) {
          that.OnCloseCounter = parseInt(that.OnCloseCounter, 10);
          that.StepCounter = parseInt(that.StepCounter, 10);
          if (that.OnCloseCounter > -1) {
              ClassesforTracking +=that.StepCounter + 1 + (that.OnCloseCounter + 1) + ":";
              if (isSet(ReqObj.Form[tmpId].OnCloseArray) &&isSet(ReqObj.Form[tmpId].OnCloseArray[that.OnCloseCounter])) {
                  for (var i = 0;i < ReqObj.Form[tmpId].OnCloseArray[that.OnCloseCounter].length;i++) {
                      if (i < ReqObj.Form[tmpId].OnCloseArray[that.OnCloseCounter].length &&i > 0)
                      ClassesforTracking += "-";
                      ClassesforTracking += ConstructorName(ReqObj.Form[tmpId].OnCloseArray[that.OnCloseCounter][i].Obj);
                  }
              }
              blenqGATracking(form_type,ClassesforTracking,getEventLabel(),0,tmpId);
              CloseForm(tmpId);
          } else {
              ClassesforTracking += that.StepCounter + 1 + 1 + ":ThankYou";
              CloseForm(tmpId);
          }
      }
    } else {
      var constructor = "";
      if (isSet(ReqObj.Form[tmpId].OnCloseStep) && !ReqObj.Form[tmpId].OnCloseStep) {
          ClassesforTracking += that.StepCounter + 1 + ":";
          if (isSet(ReqObj.Form[tmpId].UiArray[that.StepCounter])) {
              for (var i = 0;i < ReqObj.Form[tmpId].UiArray[that.StepCounter].length;i++) {
              if (i < ReqObj.Form[tmpId].UiArray[that.StepCounter].length && i > 0)
                  ClassesforTracking += "-";
              constructor += ConstructorName(ReqObj.Form[tmpId].UiArray[that.StepCounter][i].Obj);
              ClassesforTracking += ConstructorName(ReqObj.Form[tmpId].UiArray[that.StepCounter][i].Obj);
              }
          }
          blenqGATracking(form_type, ClassesforTracking, getEventLabel(), 0, tmpId);
          if (isBl(tmpId) || isEnq(tmpId)) {
              ReqObj.Form[tmpId].FormSequence._screen7(tmpId);
          } else ReqObj.Form[tmpId].FormSequence.OnCloseSeq(tmpId);
      } else {
          ClassesforTracking +=that.StepCounter + 1 + (that.OnCloseCounter + 1) + ":";
          if (isSet(ReqObj.Form[tmpId].OnCloseArray) &&isSet(ReqObj.Form[tmpId].OnCloseArray[that.OnCloseCounter])) {
              if (isSet(ReqObj.Form[tmpId].OnCloseArray[that.OnCloseCounter])) {
                  for (var i = 0;i < ReqObj.Form[tmpId].OnCloseArray[that.OnCloseCounter].length;i++) {
                      if (i < ReqObj.Form[tmpId].OnCloseArray[that.OnCloseCounter].length &&i > 0)
                          ClassesforTracking += "-";
                      ClassesforTracking += ConstructorName(ReqObj.Form[tmpId].OnCloseArray[that.OnCloseCounter][i].Obj);
                  }
              }
          }
          blenqGATracking(form_type,ClassesforTracking,getEventLabel(),0,tmpId);
          ReqObj.Form[tmpId].FormSequence.OnClosegetStep(tmpId);
      }
    }
  }
  
  /*
  Currently there are only  two sections left and right. More sections can be added ! Follow the same pattern.
  */
  function sectionInitialisationStepWise(tmpId, step) {
    leftSideInitialise(tmpId, step);
    rightSideInitialise(tmpId, step);
    if (pdpInactiveBL(tmpId)) {
      let relatedProdHtml = downSideInitialise(tmpId);
      if (!document.getElementById("recommendProd")) {
        $("#t" + tmpId + "_mcont").append(relatedProdHtml);
      }
  
      if(relatedProdHtml!=''){
          $("#recommendProd").css({
              display: "block",
          });
      }
    }
  }
  
  function downSideInitialise(tmpId) {
      let brd_mcat_id = ReqObj.Form[tmpId].mcatId;
      let forms_data = $.parseJSON(
          sessionStorage.getItem("formsPla" + brd_mcat_id)
      );
      
      return (isSet(forms_data) && forms_data.length>1) ? recomendedProds(forms_data,tmpId) : '';
  }
  
  function recomendedProds(forms_data,tmpId) {
      if(isSet(forms_data)){
          let html = `<!-- Similar Section -->
              <div id="recommendProd" class="VSP-SEC">
              <div class="vsp-heading">
                  <h3>View Similar products</h3>
              </div>
              <ul id="prodList" class="ProBoxUL">`;
          let count=0;
          forms_data.forEach((item) => {
              count+=1;
              item.ProdUrl = item.ProdUrl + '&blform=1';
              html += `<li class="berds10" id='recomProd${count}' onclick="bltrack(${count},${tmpId})">
                            <a target="_blank" href=${item.ProdUrl} class="ProBox-Item disp-inl">
                                <div class="Proimg">
                                    <img src=${item.ProdImage} />
                                </div>
                                <p class="procontent color3 atxu cbl_fs16 befwt">${item.ProdName}</p>
                                <p class="proPrice">${item.Price}</p>
                            </a>
                      </li>`;
          });
  
          html += `</ul></div>`;
          return html;
      }
  }
  function bltrack(count,tmpId){
      ReqObj.Form['0'+tmpId].inactiveBL = true;
      blenqGATracking("Inactive BL", "Prod"+count, getEventLabel(), 0, "0901");
      ReqObj.Form['0'+tmpId].inactiveBL = false;
  }
  function leftSideInitialise(tmpId, step) {
    // this will create inner contaniers for left section acc to type of form
    new LeftSide(tmpId, ReqObj.Form[tmpId].typeofform, step);
  }
  
  function rightSideInitialise(tmpId, step) {
    // this will create inner contaniers for right section acc to type of form
    if (step === 0) new RightSide(tmpId, ReqObj.Form[tmpId].typeofform, step);
  }
  
  function initialiseOuterSection(tmpId) {
    // this will create outer containers for left and right sections
    $("#t" + tmpId + "_leftsection").html("");
    $("#t" + tmpId + "_rightsection").html("");
    $("#t" + tmpId + "_leftsection").html(
      sectionInitialise(getSections(tmpId, ReqObj.Form[tmpId].typeofform)["left"])
    );
    $("#t" + tmpId + "_rightsection").html(
      sectionInitialise(
        getSections(tmpId, ReqObj.Form[tmpId].typeofform)["right"]
      )
    );
  }
  
  function sectionInitialise(section_obj) {
    var len = section_obj.length;
    var html = "";
    for (var i = 0; i < len; i++) {
      html +=
        returnContainer(
          section_obj[i].section_id,
          section_obj[i].section_element,
          section_obj[i].section_class,
          "",
          "",
          ""
        ) + "</div>";
    }
    return html;
  }
  
  function getSections(tmpId, typeofform) {
    // section wise object
    var section_obj = {};
    section_obj[typeofform] = {
      left: getSectionObject(tmpId, typeofform, "left"),
      right: getSectionObject(tmpId, typeofform, "right"),
    };
    return section_obj[typeofform];
  }
  
  function getSectionObject(tmpId, typeofform, side) {
    // by using defined global variables
    var sectionnumber = section_number[typeofform][side];
    var data = {};
    var arr = [];
    for (var i = 1; i <= sectionnumber; i++) {
      // don't start from 0 if 0 pass sectionnumber + 1 in class
      data["section_id"] = "t" + tmpId;
      data["section_element"] = section_class[typeofform][side][i]["id"];
      data["section_name"] = section_class[typeofform][side][i]["name"];
      data["section_class"] = section_class[typeofform][side][i]["cls"];
      arr.push(createSectionObject(data));
    }
    return arr;
  }
  
  function createSectionObject(data) {
    // object will be created
    return {
      section_id: data["section_id"],
      section_name: data["section_name"],
      section_class: data["section_class"],
      section_element: data["section_element"],
    };
  }
  
  function toFireGeneration(tmpId, type) {
    var toreturn = true;
    if (isEnq(tmpId)) {
      toreturn = isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn !== "" ? true : false;
      toreturn = isSet(type) && type === "intent" ? false : toreturn;
      if ( toreturn === false && isSet(ReqObj.Form[tmpId].enqintentCalled) && ReqObj.Form[tmpId].enqintentCalled === false)
        toFireEnqIntent(tmpId);
      ReqObj.Form[tmpId].toFireIsq = toreturn === true || (toreturn === false && isSet(ReqObj.Form[tmpId].generationId) && parseInt(ReqObj.Form[tmpId].generationId) !== defaultGenerationId) ? true : false;
    } else if (isBl(tmpId)) {
      toreturn = Bl01(tmpId) && ReqObj.Form[tmpId].screenNumber < 2 && isSecondBl() && ReqObj.UserDetail["uv"] !== "V" && !ReqObj.Form[tmpId]._NCOnFrstScrn ? false : isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn !== "" ? true : false;
      if ( Bl09(tmpId) && isSecondBl() && ReqObj.UserDetail["uv"] !== "V" && _mandatDetailsFilled() && !ReqObj.Form[tmpId]._NCOnFrstScrn)
        toreturn = false;
      if (Bl04(tmpId) && isSecondBl() && ReqObj.UserDetail["uv"] !== "V") {
        if ( !_mandatDetailsFilled() || (_mandatDetailsFilled() && !ReqObj.Form[tmpId]._NCOnFrstScrn && isSet(ReqObj.Form[tmpId].intentCalled) && ReqObj.Form[tmpId].intentCalled === false))
          toreturn = false;
      }
  
      if ( toreturn === false && isSet(ReqObj.Form[tmpId].intentCalled) && ReqObj.Form[tmpId].intentCalled === false)
        toFireBLIntent(tmpId, "");
      ReqObj.Form[tmpId].toFireIsq = toreturn === true ? true : false;
    } else if ( ReqObj.Form[tmpId].formType.toLowerCase() === "bl" || IsChatbl(tmpId)) {
      if ( ReqObj.UserDetail["uv"] === "V" || (ReqObj.UserDetail["uv"] !== "V" && !isSecondBl()))
        toreturn = isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn !== "" ? true : false;
      if (ReqObj.UserDetail["uv"] !== "V" && isSecondBl()) toreturn = false;
      if ( toreturn === false && isSet(ReqObj.Form[tmpId].intentCalled) && ReqObj.Form[tmpId].intentCalled === false)
        toFireBLIntent(tmpId, "");
      ReqObj.Form[tmpId].toFireIsq = toreturn === true ? true : false;
    } else toreturn = true;
  
    ReqObj.Form[tmpId].toFireIsq = isSet(ReqObj.Form[tmpId].generationId) && parseInt(ReqObj.Form[tmpId].generationId) !== defaultGenerationId ? true : ReqObj.Form[tmpId].toFireIsq;
  
    return toreturn;
  }
  
  function toFireEnqIntent(tmpId) {
    if ( (Enq09(tmpId) && ReqObj.Form[tmpId].FormSequence._stepCounter === 0) || ((ReqObj.Form[tmpId].FormSequence._stepCounter === 1 || ReqObj.Form[tmpId].FormSequence._stepCounter === 0) && Enq04(tmpId))) {
      new Generation(1, 1).onSubmit(tmpId);
      ReqObj.Form[tmpId].enqintentCalled = true;
    } else ReqObj.Form[tmpId].enqintentCalled = false;
  }
  
  /*----------------------------------------------IntentGeneration------------------------------------------ */
  
  function GenerateIntent(data) {
    var form_type =
      !isSet(data["form_type"]) || data["form_type"] === ""
        ? ""
        : data["form_type"];
    if (form_type === "")
      form_type =
        !isSet(data["formType"]) || data["formType"] === ""
          ? ""
          : data["formType"];
    data["form_type"] = form_type;
    var tmpId =
      parseInt(data["tmpId"]) === 0 || !isSet(data["tmpId"]) ? 0 : data["tmpId"];
    data["tmpId"] = "";
    if (
      data["form_type"].toLowerCase() !== "" &&
      data["form_type"].toLowerCase() === "bl"
    ) {
      var blIntent = data["BLIntent"].toLowerCase();
      if (isSet(blIntent) && blIntent !== "") {
        if (blIntent === "yes" && data["ctaName"].toLowerCase() === "mcat video")
          data["flag"] = 16;
        if (blIntent === "yes" && data["ctaName"].toLowerCase() !== "mcat video")
          data["flag"] = 14;
      }
    } //
    data = ObjectTrim(data);
    if (imeshExist() !== "") {
      var s = parseInt(data["flag"]) === 12 && tmpId !== 0 ? true : false;
      var f = tmpId !== 0 ? true : false;
      fireAjaxRequest({
        data: {
          ga: {
            gatype: "IntentGeneration",
            s: s,
            f: f,
            source: "",
          },
          tmpId: tmpId,
          ajaxObj: {
            obj: "",
            s: {
              ss: 0,
              sf: {
                af: 0,
                pa: 0,
              },
              f: 0,
            },
            f: {
              f: 0,
            },
          },
          ajaxtimeout: 0,
          ajaxdata: data,
          hitfinserv: "",
          type: 0,
        },
      });
    }
  }
  
  
  /*------------------------------------Enquiry On Success-------------------------------------------*/
  
  function EnqGenOnSuccess(event, res) {
    if (ReqObj.Form[event.data.tmpId].insert === "I")
      var IsResponseIdValid = ValidGenId(res.queryid);
    if (
      isSet(ReqObj.Form[event.data.tmpId].insert) &&
      ((ReqObj.Form[event.data.tmpId].insert === "I" && IsResponseIdValid) ||
        ReqObj.Form[event.data.tmpId].insert !== "I")
    ) {
      if (ReqObj.Form[event.data.tmpId].insert === "I") {
        ReqObj.Form[event.data.tmpId].generationId = SanitizeId(res.queryid);
        ReqObj.Form[event.data.tmpId].query_destination = res.query_destination;
        disableEnquiryButton(event.data.tmpId);
      }
    }
    if (ReqObj.Form[event.data.tmpId].toFireIsq === true)
      new Isq(event.data.tmpId).onSubmit(event.data.tmpId, true);
    if (
      isEnq(event.data.tmpId) &&
      ReqObj.Form[event.data.tmpId].ReqDtlBox &&
      isSet(ReqObj.Form[event.data.tmpId].flags.isEnrichCalled) &&
      !ReqObj.Form[event.data.tmpId].flags.isEnrichCalled
    )
      new RequirementDtl(event.data.tmpId).onSubmit(event.data.tmpId, true);
    if (event.data.tmpId === ReqObj.finEnq) {
      ReqObj.finEnq = "";
      var data = {
        ofr_id: res.queryid,
        rfq_queryDestination: res.query_destination,
        modId: event.data.ajaxdata.modid,
      };
      var data_arr = { sr: "gen", data_res: data };
      FinishEnquiryService(event.data.tmpId, data_arr);
    }
  }
  /*------------------------------------BL On Success-------------------------------------------*/
  
  function BLGenOnSuccess(event, res) {
    if (
      ReqObj.Form[event.data.tmpId].insert === "I" &&
      IsFormBL(event.data.tmpId)
    )
      var IsResponseIdValid = ValidGenId(res.ofr);
  
    if (
      isSet(res) &&
      isSet(ReqObj.Form[event.data.tmpId].insert) &&
      ((ReqObj.Form[event.data.tmpId].insert === "I" && IsResponseIdValid) ||
        ReqObj.Form[event.data.tmpId].insert !== "I")
    ) {
      if (
        IsFormBL(event.data.tmpId) &&
        ReqObj.Form[event.data.tmpId].insert === "I"
      ) {
        ReqObj.Form[event.data.tmpId].generationId = SanitizeId(res.ofr);
      }
    }
    if (
      ReqObj.Form[event.data.tmpId].formType.toLowerCase() === "bl" &&
      ReqObj.Form[event.data.tmpId].toFireIsq === true
    )
      new Isq(event.data.tmpId).onSubmit(event.data.tmpId, true);
    if (
      (Bl09(event.data.tmpId) ||
        Bl01(event.data.tmpId) ||
        Bl04(event.data.tmpId)) &&
      ReqObj.Form[event.data.tmpId].ReqDtlBox &&
      isSet(ReqObj.Form[event.data.tmpId].flags.isEnrichCalled) &&
      !ReqObj.Form[event.data.tmpId].flags.isEnrichCalled
    )
      new RequirementDtl(event.data.tmpId).onSubmit(event.data.tmpId, true);
  }
  /*------------------------------------Enquiry/BL On Error-------------------------------------------*/
  
  function BlEnqOnError(revent, res) {
    usercookie.deleteCookie("imEqGl");
    $("#t" + revent.data.tmpId + "_cls")
      .off("click")
      .on("click", function (event) {
        CloseForm(revent.data.tmpId);
      });
  }
  
  /*-------------------------Communication Headings-------------------------------------------*/
  function getEnqHeading(tmpId, fromscreen) {
    if (pdpenqImage(tmpId)) return "";
    var ctanamemodid = ReqObj.Form[tmpId].ctaName.toLowerCase().trim();
    if (
      tmpId.substring(0, 2) !== "09" &&
      ReqObj.Form[tmpId].FormSequence.StepCounter === 0
    )
      return defaultCaseHeading(ctanamemodid, tmpId, ReqObj.Form[tmpId].ctaName);
    var fromscreen = fromscreen.toLowerCase();
    switch (fromscreen) {
      case "userlogin":
        return getLoginHeading(ctanamemodid, tmpId, ReqObj.Form[tmpId].ctaName);
      case "userlogincontactdetail":
        return getLoginHeading(ctanamemodid, tmpId, ReqObj.Form[tmpId].ctaName);
      case "contactdetail":
        return getContactHeading("all", tmpId, ReqObj.Form[tmpId].ctaName);
      case "isq":
        return getIsqHeading(ctanamemodid, tmpId, ReqObj.Form[tmpId].ctaName);
      case "isqrequirementdtl":
        return currentISO() === "IN"
          ? getBlStaticIsqReqHeading("all", tmpId, ReqObj.Form[tmpId].ctaName)
          : getIsqHeading(ctanamemodid, tmpId, ReqObj.Form[tmpId].ctaName);
      case "requirementdtl":
        return getReqHeading("all", tmpId, ReqObj.Form[tmpId].ctaName);
      case "blstaticques":
        return getBlStaticIsqReqHeading("all", tmpId, ReqObj.Form[tmpId].ctaName);
      case "contactdetailonclosein":
        return getContactDetailOnCloseInHeading(
          "all",
          tmpId,
          ReqObj.Form[tmpId].ctaName
        );
      case "contactdetailonclosenotin":
        return getContactDetailOnCloseNotInHeading(
          "all",
          tmpId,
          ReqObj.Form[tmpId].ctaName
        );
      case "userverification":
        return getUserVerificationHeading(
          "all",
          tmpId,
          ReqObj.Form[tmpId].ctaName
        );
      case "userverificationonclose":
        return getUserVerificationHeading(
          "all",
          tmpId,
          ReqObj.Form[tmpId].ctaName
        );
      case "moredetailscompanyname":
        return "Provide your company name to get quick response from supplier";
      case "moredetailsgst":
        return "Provide your GST number to get quick response from supplier";
      default:
        return defaultScreenMsg(ctanamemodid, tmpId, ReqObj.Form[tmpId].ctaName);
    }
  }
  
  function getBLHeading(tmpId, fromscreen) {
    var iso = currentISO();
    if (
      ReqObj.Form[tmpId].ctaName.toLowerCase() === "middle" &&
      Bl04(tmpId) &&
      ReqObj.Form[tmpId].FormSequence._screenCounter === 0
    )
      return "<div class='beclrW be-bgb cbl_p10 txt-cnt' style='font-size: 18px;'>Tell us what you need</div>";
    if (
      tmpId.substr(0, 2) === "01" &&
      isGlIdEven(tmpId) &&
      ReqObj.Form[tmpId].screenNumber < 0
    ) {
      var heading = "Tell us what you need, and we'll help you get quotes";
      heading =
        iso != "IN"
          ? pdpBL(tmpId)
            ? "Save Time! Get <strong>verified exporters</strong> shipping to " +
              isoCountries[currentISO()]
            : "Save Time! Get verified sellers exporting to " +
              isoCountries[currentISO()]
          : heading;
      return heading;
    }
    //ff_here
    var _case =
      (ReqObj.Form[tmpId].FormSequence._screenCounter === 0 ||
        ReqObj.Form[tmpId].FormSequence._screenCounter === 1) &&
      Bl04(tmpId)
        ? -1
        : 0;
    if (iso === "IN" && _case !== -1) {
      var mainHeading = "";
      var subHeading = "";
      fromscreen = fromscreen.toLowerCase();
      if (fromscreen.includes("productname")) {
        mainHeading = "Looking to buy something?";
        subHeading =
          "Tell us your requirement and get free quotes from multiple sellers";
      } else if (fromscreen === "contactdetail") {
        mainHeading = "We want to know more about you!";
        subHeading = "Please provide a few details to get quotes on your mobile";
      } else if (fromscreen === "isq") {
        mainHeading = "Share more details about your requirement";
        subHeading = "Add a few details to connect with relevant suppliers";
        if (ReqObj.Form[tmpId].prevCount > 3) {
          mainHeading = "Share more details about your requirement";
          subHeading = "Add a few more details to submit your requirement";
        }
      } else if (
        fromscreen.includes("blstaticques") ||
        fromscreen.includes("requirementdtl")
      ) {
        mainHeading = "Few more details to get your requirement fulfilled";
        subHeading = "Share a few more information and get best quotes";
      } else if (
        fromscreen.includes("contactdetail_last") ||
        fromscreen.includes("moredetails") ||
        fromscreen === "default"
      ) {
        mainHeading = "Just one step away to connect with verified sellers";
        subHeading = "Enter your remaining contact details";
      } else if (fromscreen === "userverification") {
        var imeshcookie = imeshExist();
        var phonenumber =
          "+" +
          usercookie.getParameterValue(imeshcookie, "phcc") +
          "-" +
          usercookie.getParameterValue(imeshcookie, "mb1");
        mainHeading = "Verify your mobile number to receive quotes";
        // subHeading = "Enter the 4 digit One Time Password (OTP) sent to your Mobile Number " + phonenumber;
      }
      let bemb = pdpInactiveBL(tmpId) ? "bemb8" : "bemb20";
      return (
        "<div class='otphdg'>" +
        mainHeading +
        `</div><div class='befs16 blotp ${bemb}'>` +
        subHeading +
        "</div>"
      );
    } else {
      var blmsg = "Save Time! Get verified sellers ";
      blmsg +=
        iso !== "IN"
          ? "exporting to " +
            isoCountries[iso] +
            "<div class='cbl_fs17 eqmb10 bemt10 beclr3'>Requirement for: <span class='befwt'>" +
            ReqObj.Form[tmpId].prodName +
            "</span></div>"
          : "for " + ReqObj.Form[tmpId].prodName;
      if (
        tmpId.substring(0, 2) !== "09" &&
        ReqObj.Form[tmpId].FormSequence.StepCounter === 0 &&
        fromscreen !== "ContactDetailonclosenotin"
      )
        return tmpId.substring(0, 2) === "04"
          ? ""
          : isSet(ReqObj.Form[tmpId].prodName) &&
            ReqObj.Form[tmpId].prodName !== ""
          ? blmsg
          : "Tell us your requirement";
      else
        return currentISO() === "IN"
          ? tmpId.substr(0, 2) === "01" && isGlIdEven(tmpId)
            ? "Adding few details can get you a quick response"
            : "Tell us what you need, and we'll help you get quotes"
          : pdpBL(tmpId)
          ? "Receive quotations from <strong>verified exporters</strong> shipping to " +
            isoCountries[currentISO()]
          : "Receive quotations from verified suppliers exporting to " +
            isoCountries[currentISO()];
    }
  }
  
  function getChatBlHeading(tmpId, fromscreen) {
    return "Tell us your requirement to Get Best Price";
  }
  
  function getFormHeading(tmpId, fromscreen) {
    var formType = ReqObj.Form[tmpId].formType.toLowerCase();
    switch (formType) {
      case "enq":
        return getEnqHeading(tmpId, fromscreen);
      case "bl":
        return getBLHeading(tmpId, fromscreen);
      case "chatbl":
        return getChatBlHeading(tmpId, fromscreen);
    }
  }
  
  function defaultScreenMsg(ctanamemodid, tmpId, ctaname) {
    return isEnq(tmpId)
      ? direnqImage(tmpId) ? "" : "Please provide a few details to get quick response from the supplier"
      : imeshExist() === ""
      ? getLoginHeading(ctanamemodid, tmpId, ctaname)
      : loginDefaultmsg(tmpId, ctaname, "Connect with ");
  }
  
  function loginGetmsg(tmpId, msg, addon) {
    var usertype = currentISO() !== "IN" ? "email" : "mobile";
    var hcls = isMoglixUi(tmpId) ? "BL_Fwb" : "befwt";
    return (
      returnSpan("", "", msg, hcls) +
      " " +
      addon +
      ' from "' +
      ReqObj.Form[tmpId].rcvName +
      '" on your ' +
      usertype +
      " quickly"
    );
  }
  
  function loginGetmsgSpecialCase(tmpId, msg, addon) {
    var usertype = currentISO() !== "IN" ? "email" : "mobile";
    return (
      returnSpan("", "", msg, "befwt") +
      " " +
      addon +
      " on your " +
      usertype +
      " quickly"
    );
  }
  
  function loginDefaultmsg(tmpId, ctaname, msg) {
    if (isImageVidEnq(tmpId))
      return (
        returnSpan("", "", "Get Best Quotes", "befwt") +
        " for " +
        ReqObj.Form[tmpId].prodName
      );
    else
      return (
        msg + '"' + returnSpan("", "", ReqObj.Form[tmpId].rcvName, "befwt") + '"'
      );
  }
  
  function contactLogMsg(tmpId, ctaname, msg) {
    return msg + '"' + ReqObj.Form[tmpId].rcvName + '" for more information';
  }
  
  function contactMsg(tmpId, ctaname) {
    if(direnqImage(tmpId)){
      return "";
    }
    else{
      return returnSpan("", "", "Supplier wants to know more about you", "befwt");
    }
    // return returnSpan("", "", "Supplier wants to know more about you", "befwt");
  }
  
  function getLoginHeading(ctanamemodid, tmpId, ctaname) {
    switch (ctanamemodid) {
      case "get best quote":
        return loginGetmsg(tmpId, ctaname, "");
      case "get quote":
        return loginGetmsg(tmpId, ctaname, "");
      case "get latest price":
        return loginGetmsg(tmpId, ctaname, "and details");
      case "inlineenq":
        return loginDefaultmsg(tmpId, ctaname); //
      case "send email":
        return loginDefaultmsg(tmpId, ctaname, "Connect with "); //
      case "send sms":
        return loginDefaultmsg(tmpId, ctaname, "Connect with "); //
      case "contact seller":
        return loginGetmsgSpecialCase(tmpId, "Contact Seller", "and get details");
      case "contact seller_next":
        return loginGetmsgSpecialCase(tmpId, "Contact Seller", "and get details");
      case "contact seller_pre":
        return loginGetmsgSpecialCase(tmpId, "Contact Seller", "and get details");
      case "contact supplier":
        return loginGetmsgSpecialCase(
          tmpId,
          "Contact Supplier",
          "and get details"
        );
      case "click to call":
        return loginDefaultmsg(tmpId, ctaname, "Connect with "); //
      case "ask price":
        return loginGetmsg(tmpId, "Ask for price", "and details");
      case "ask for price":
        return loginGetmsg(tmpId, "Ask for price", "and details");
      case "no price":
        return loginGetmsg(tmpId, "Ask for price", "and details");
      case "request a call back":
        return loginGetmsg(tmpId, "", "Request a Call Back ");
      case "contact now":
        return contactLogMsg(tmpId, ctaname, "Contact ");
      default:
        return loginDefaultmsg(tmpId, ctaname, "Connect with ");
    }
  }
  
  function getContactHeading(ctanamemodid, tmpId, ctaname) {
    switch (ctanamemodid) {
      case "all":
        return contactMsg(tmpId, ctaname);
      /*Do not remove this code*/
      // case "get best quote": return loginDefaultmsg(tmpId, ctaname);
      // case "get quote": return loginDefaultmsg(tmpId, ctaname);
      // case "get latest price": return loginDefaultmsg(tmpId, ctaname);
      // case "inlineenq": return loginDefaultmsg(tmpId, ctaname);
      // case "send email": return loginDefaultmsg(tmpId, ctaname);
      // case "send sms": return loginDefaultmsg(tmpId, ctaname);
      // case "contact seller": return loginDefaultmsg(tmpId, ctaname);
      // case "contact seller_next": return loginDefaultmsg(tmpId, ctaname);
      // case "contact seller_pre": return loginDefaultmsg(tmpId, ctaname);
      // case "click to call": return loginDefaultmsg(tmpId, ctaname);
      // case "ask price": return loginDefaultmsg(tmpId, "Ask Price");
      // case "ask for price": return loginDefaultmsg(tmpId, "Ask Price");
      // case "no price": return loginDefaultmsg(tmpId, "Ask Price");
      // case "request a call back": return loginGetmsg(tmpId, "", "get a Call Back");
      // case "contact now": return contactLogMsg(tmpId, ctaname, "Contact ");
      /* Do not remove this code*/
      default:
        return loginDefaultmsg(tmpId, ctaname, "Connect with ");
    }
  }
  
  function returnIsqHeading(tmpId, ctaname) {
    return isSet(ReqObj.Form[tmpId].ctaheadingappend) &&
      ReqObj.Form[tmpId].ctaheadingappend === true
      ? returnSpan("", "", ctaname, "befwt") +
          "\n" +
          " by adding a few details of your requirement"
      : "Adding a few details of your requirement can get you quick response from the supplier";
  }
  
  function getIsqHeading(ctanamemodid, tmpId, ctaname) {
    switch (ctanamemodid) {
      case "get best quote":
        return returnIsqHeading(tmpId, "Get Best Quote");
      case "get quote":
        return returnIsqHeading(tmpId, "Get Quote");
      case "get latest price":
        return returnIsqHeading(tmpId, "Get Latest Price");
      case "contact seller":
        return returnIsqHeading(tmpId, "Contact Seller");
      case "contact seller_next":
        return returnIsqHeading(tmpId, "Contact Seller");
      case "contact seller_pre":
        return returnIsqHeading(tmpId, "Contact Seller");
      case "contact supplier":
        return returnIsqHeading(tmpId, "Contact Supplier");
      case "ask price":
        return returnIsqHeading(tmpId, "Ask Price");
      case "ask for price":
        return returnIsqHeading(tmpId, "Ask for price");
      //case 'all': return "Adding a few details of your requirement can get you quick response from the supplier";
      default:
        if(direnqImage(tmpId)){
          return "";
        }
        else{
          return "Adding a few details of your requirement can get you quick response from the supplier";
        }
        
    }
  }
  
  function defaultCaseHeading(ctanamemodid, tmpId, ctaname) {
    switch (ctanamemodid) {
      case "sticky right":
        return "";
      default:
        return isSet(ReqObj.Form[tmpId].heading) &&
          ReqObj.Form[tmpId].heading.trim() !== ""
          ? ReqObj.Form[tmpId].heading
          : "Send Enquiry to the Seller";
    }
  }
  
  function getReqHeading(ctanamemodid, tmpId, ctaname) {
    switch (ctanamemodid) {
      case "all":
        return "Send a quick message to the seller for more information.";
      default:
        return defaultCaseHeading(ctanamemodid, tmpId, ctaname);
    }
  }
  
  function getUserVerificationHeading(ctanamemodid, tmpId, ctaname) {
    switch (ctanamemodid) {
      case "all":
        if(direnqImage(tmpId)){
          return "";
        }
        else{
          return "Confirm your requirement";
        }
        // return "Confirm your requirement";
      default:
        return defaultCaseHeading(ctanamemodid, tmpId, ctaname);
    }
  }
  
  function getBlStaticIsqReqHeading(ctanamemodid, tmpId, ctaname) {
    switch (ctanamemodid) {
      case "all":
        if(direnqImage(tmpId)){
          return "";
        }
        else{
          return "Almost done!";
        }
        // return "Almost done!";
      default:
        defaultCaseHeading(ctanamemodid, tmpId, ctaname);
    }
  }
  
  function getContactDetailOnCloseInHeading(ctanamemodid, tmpId, ctaname) {
    switch (ctanamemodid) {
      case "all":
        return "Looks like you missed a few details!";
      default:
        return defaultCaseHeading(ctanamemodid, tmpId, ctaname);
    }
  }
  
  function getContactDetailOnCloseNotInHeading(ctanamemodid, tmpId, ctaname) {
    switch (ctanamemodid) {
      case "all":
        return "Awesome! You're Done";
      default:
        return defaultCaseHeading(ctanamemodid, tmpId, ctaname);
    }
  }
  //
  /*
   * DO NOT REMOVE
   * touch at your own risk
   */
  var defaultGenerationId = 1;
  var flagsugg = new FlagSuggestor();
  var usercookie = new UserCookie();
  /*
   * DO NOT REMOVE
   * touch at your own risk
   */
  
  function ClearSeqArrays(tmpId) {
    ReqObj.Form[tmpId]["UiArray"] = [];
    ReqObj.Form[tmpId]["ServiceSequence"] = [];
    ReqObj.Form[tmpId]["HitArray"] = [];
    ReqObj.Form[tmpId]["OnCloseArray"] = [];
  }
  
  function IsqKeys(tmpId) {
    ReqObj.Form[tmpId].IsqArray = "";
    ReqObj.Form[tmpId].prevCount = 0;
    ReqObj.Form[tmpId].stopper = 0;
    ReqObj.Form[tmpId].IsqLength = 0;
    ReqObj.Form[tmpId].IsqDiv = 0;
    ReqObj.Form[tmpId].isqScreen = 0;
    ReqObj.Form[tmpId].isqSubmitted = 0;
    ReqObj.Form[tmpId].questionCount = 0;
    ReqObj.Form[tmpId].questionsId = [];
    ReqObj.Form[tmpId].questionsDesc = [];
    ReqObj.Form[tmpId].optionsId = [];
    ReqObj.Form[tmpId].optionsValue = [];
    ReqObj.Form[tmpId].Isq = {};
    ReqObj.Form[tmpId].Isq.CurrentPageQuestions = [];
    ReqObj.Form[tmpId].Isq.CurrentScreenAnswers = "";
    ReqObj.Form[tmpId].toGetCurrentPagestring = false;
    ReqObj.Form[tmpId].toGetQuestionsOnly = false;
    ReqObj.Form[tmpId].Isq.getIsqQuestionString = [];
    ReqObj.Form[tmpId].Isq.currentQuestionString = [];
    ReqObj.Form[tmpId].requireNow = false;
    ReqObj.Form[tmpId].isQuantIsq = false;
    ReqObj.Form[tmpId].isQtutShown = false;
    ReqObj.Form[tmpId].QtUtError = false;
    ReqObj.Form[tmpId].qutAnswers = [];
    ReqObj.Form[tmpId].IsqQtUtEvents = {
      onselect: false,
    };
    ReqObj.Form[tmpId].unitSuggester = []; // empty array while initialising
    ReqObj.Form[tmpId].qtutchange = {
      quantity: "empty",
      unit: "prefilled",
    }; // fine
    ReqObj.Form[tmpId].qtUtQuesPresent = false;
    ReqObj.Form[tmpId].noSampling = false;
  }
  
  function ContactDetailKeys(tmpId) {
    ReqObj.Form[tmpId].ContactDetail = {};
  }
  
  function RdBoxKeys(tmpId, reqBx) {
    ReqObj.Form[tmpId].ReqDtlBox = isSet(ReqObj.Form[tmpId].ReqDtlBox)
      ? ReqObj.Form[tmpId].ReqDtlBox
      : "";
    ReqObj.Form[tmpId].flags.isDescDivShown =
      isSet(reqBx) && reqBx !== "" ? reqBx : false;
    ReqObj.Form[tmpId].ReqDtl = {};
  
    // ReqObj.Form[tmpId].IsCheckboxChecked = false;
    // ReqObj.Form[tmpId].flags.isDescDivShown = false;
  }
  
  function EnrichKeys(tmpId) {
    ReqObj.Form[tmpId].EnrichmentVal = "";
  
    ReqObj.Form[tmpId].flags.isEnrichShown.isStaticShown = false;
    ReqObj.Form[tmpId].flags.isEnrichShown.isAttachmentShown = false;
    // ReqObj.Form[tmpId].IsCheckboxChecked = false;
    // ReqObj.Form[tmpId].flags.isDescDivShown = false;
  }
  
  function StaticIsqKeys(tmpId) {
    ReqObj.Form[tmpId].Static = {
      questionsId: [],
      questionsDesc: [],
      optionsId: [],
      optionsValue: [],
    };
  }
  
  function ChatBlKeys(tmpId) {
    /* Should be POP-UP not inline change tmpIds accordingly */
    if (IsChatbl(tmpId)) {
      // ReqObj.Form[tmpId].classfortracking = "";
      // ReqObj.Form[tmpId].prevClass = "";
      ReqObj.Form[tmpId].UserInputs = {
        CountryName: "",
        IsCountry: "",
        IsProduct: "",
        ProductName: "",
        PrimaryInfo: "",
        Name: "",
        Mobile: "",
        Email: "",
        City: "",
        CityId: "",
        Requirement: "",
        OTP: "",
        toChange: "",
        Company: "",
        GST: "",
      };
    }
  }
  
  function setTemplateDefaultValue(tempId, instId, templateDefaults, reqBx) {
    var tmpId = tempId + instId;
  
    //should be called once
    PropertyDefault(tmpId, templateDefaults);
  
    //both times
    IsqKeys(tmpId);
    RdBoxKeys(tmpId, reqBx);
    EnrichKeys(tmpId);
    StaticIsqKeys(tmpId);
    ContactDetailKeys(tmpId);
  
    ReqObj.Form[tmpId].cityOth = "";
    ReqObj.Form[tmpId].generationCalled = false;
    // ReqObj.Form[tmpId].sequenceUpdate = false;
  
    ReqObj.userType = "";
    // ReqObj.Form[tmpId].customHeadline = ReturnCorrectVal(templateDefaults.customHeadline, "");
    // ReqObj.Form[tmpId].isGaSet = false;
  
    //once
    MakeRefText(tmpId);
  
    ReqObj.Form[tmpId].selectPrdTitle = function (event, ui) {
      selectTitle(tmpId, ui);
    };
    // if (isSet(ReqObj.Form[tmpId].flags) && !ReqObj.Form[tmpId].flags.isFlagSuggSet) {
    //   flagsugg.setFlagSuggestor(tmpId);
    // } /* No need after flag called from show step */
  }  
  
  var supplier = {
    1: { name: "Leading Supplier", class: "equLs" },
    2: { name: "Star Supplier", class: "equSs" },
  };
  var verified = {
    1: { name: "TrustSEAL Verified", class: "equTs" },
    2: { name: "Verified Supplier", class: "equVs" },
  };
  
  var verifiedexporter = {
    1: { name: "Verified Exporter", class: "equVe"}
  };
  
  function isPnsEnq(tmpId) {
    //PNS on enq form
    if (isSet(ReqObj.Form[tmpId].pnsNumber) &&
      isSet(ReqObj.Form[tmpId].ctaName) &&
      (ReqObj.Form[tmpId].ctaName.toLowerCase() == "click to call" || ReqObj.Form[tmpId].ctaName.toLowerCase() == "click to call_next" || ReqObj.Form[tmpId].ctaName.toLowerCase() == "click to call_pre")
    )
      return true;
    else return false;
  }
  function getProdDetailsHtml(tmpId, typeofform, step) {
    var html = pdpenqImage(tmpId) ? "<div class='epLf30'>" : "";
  
    html += returnContainer("t" + tmpId, "_Prodname" + step, "", "", "", "") + "</div>";
  
    var pprice = returnContainer("t" + tmpId, "_ProdPrice" + step, "befs16", "", "", "") + "<span id='t" + tmpId + "_price" + step + "'></span ><span id='t" + tmpId + "_unit" + step + "'></span > " + "</div > ";
  
    var pcom = returnContainer("t" + tmpId, "_Compname" + step, "befs16", "", "", "") + "</div>";
  
    var psold = returnContainer("t" + tmpId, "_soldBy" + step, "befs16", "", "", "") + "<span id='t" + tmpId + "_sold" + step + "'></span><span id='t" + tmpId + "_addr" + step + "'></span>" + "</div>";
  
    var pnsno = isSet(ReqObj.Form[tmpId].pnsNumber) ? ReqObj.Form[tmpId].pnsNumber : "09XXXXXXXX";
  
    pnsno = [pnsno.slice(0, 11), " ", pnsno.slice(11)].join('');   // no breathing space in pns number
  
    var enqpns = returnContainer("t" + tmpId, "_pnsEnq" + step, "befs16", "", "", "") + "<span class='pnsEnq'  ><span class='cll'>Call </span><span class='pnsno'>" + pnsno + "</span></span>" + "</div>"; //pns on enq form
  
    html += pdpenqImage(tmpId) ? "</div><div class='ibgc epLf30 epB10 epT10'>" :direnqImage(tmpId)?"<div >"  : "";
  
    html = isMoglixUi(tmpId) ? html + psold + pprice + pcom : html + pprice + pcom + psold;
  
    if (isPnsEnq(tmpId))
      //pns on enq form
      html += enqpns;
    if (pdpenqImage(tmpId) || direnqImage(tmpId)) {
      var review = isSet(ReqObj.Form[tmpId].additionalDtls) && isSet(ReqObj.Form[tmpId].additionalDtls.reviewCount) && ReqObj.Form[tmpId].additionalDtls.reviewCount !== 0 ? ReqObj.Form[tmpId].additionalDtls.reviewCount : -1;
  
      var starCount = isSet(ReqObj.Form[tmpId].additionalDtls) && isSet(ReqObj.Form[tmpId].additionalDtls.seller_rating) && ReqObj.Form[tmpId].additionalDtls.seller_rating !== 0 ? ReqObj.Form[tmpId].additionalDtls.seller_rating : 0;
  
      if ( starCount && review && !(parseInt(starCount) <= 0 && parseInt(review) <= 0)) {
        html += '<div class="befs14 eqRC1 disp-inl bemt5">';
        if (parseInt(starCount) > 0) {
          var width_par = (starCount / 5) * 100;
          html += '<span class="befwt">' + starCount + '</span>/5 <div class="eqsRt disp-inl e_f18 txtl bepr"><div class="eqflsRt eqd_l0 beabult" style="width:' + width_par + '%"><span>★★★★★</span></div><div class="eqemsRt"><span>★★★★★</span></div></div>';
        }
        html += parseInt(review) > 0 ? '<span class="eqRC2 epf12">(' + review + " Review)</span>" : "";
        html += "</div>";
      }
      var verf = ReqObj.Form[tmpId].additionalDtls["verified"];
      var supp = ReqObj.Form[tmpId].additionalDtls["supplier"];
  
      var verfexp = ReqObj.Form[tmpId].additionalDtls["VerifiedExporter"];
      
      if(direnqImage(tmpId)){
        html += '<div class="idsf eflwp befs14 eqRC3 bemt5 sldby">';
      }
      else{
        html += '<div class="idsf eflwp befs14 eqRC3 bemt5 ">';  
      }
  
      if (supp === "1" || supp === "2")
        html += '<div class="idsf id_aic emr10"><i class="imFsp oef0 ' + supplier[supp]["class"] + '"></i>' + supplier[supp]["name"] + "</div>";
  
      if (verf === "1" || verf === "2")
        html += '<div class="idsf id_aic emr10"><i class="imFsp oef0 ' + verified[verf]["class"] + '"></i>' + verified[verf]["name"] + "</div>";
      if(direnqImage(tmpId)){
        if(verfexp === "1") 
          html += '<div class="idsf id_aic emr10"><i class="imFsp oef0 ' + verifiedexporter[verfexp]["class"] + '"></i>' + verifiedexporter[verfexp]["name"] + "</div>";
      }
    //   if(verfexp === "1")
    //     html +=
    //       '<div class="idsf id_aic emr10"><i class="imFsp oef0 ' +
    //       verifiedexporter[verfexp]["class"] +
    //       '"></i>' +
    //       verifiedexporter[verfexp]["name"] +
    //       "</div>";
          
      html += "</div>";
      html += "</div>";
    }
    var cl = isMoglixUi(tmpId) ? "befs14 berowe_clr1" : "befs16 berow";
    var isq_class = pdpenqImage(tmpId) ? " epLf30" : "";
    html +=
      returnContainer(
        "t" + tmpId,
        "_isqdetails" + step,
        cl + isq_class,
        "",
        "",
        ""
      ) + "</div>";
    return html;
  }
  
  function prodDetailsData(event) {
    var datavalue = {};
    datavalue["locality"] =
      isSet(ReqObj.Form[event.initialdata.tmpId].rcvLocality) &&
      ReqObj.Form[event.initialdata.tmpId].rcvLocality !== ""
        ? ReqObj.Form[event.initialdata.tmpId].rcvLocality
        : "";
    datavalue["city"] =
      isSet(ReqObj.Form[event.initialdata.tmpId].rcvCity) &&
      ReqObj.Form[event.initialdata.tmpId].rcvCity !== ""
        ? ReqObj.Form[event.initialdata.tmpId].rcvCity
        : "";
    datavalue["state"] =
      isSet(ReqObj.Form[event.initialdata.tmpId].rcvState) &&
      ReqObj.Form[event.initialdata.tmpId].rcvState !== ""
        ? ReqObj.Form[event.initialdata.tmpId].rcvState
        : "";
    datavalue["comp_name"] =
      isSet(ReqObj.Form[event.initialdata.tmpId].rcvName) &&
      ReqObj.Form[event.initialdata.tmpId].rcvName !== ""
        ? ReqObj.Form[event.initialdata.tmpId].rcvName
        : "";
    datavalue["prod_name"] =
      isSet(ReqObj.Form[event.initialdata.tmpId].prodDispName) &&
      ReqObj.Form[event.initialdata.tmpId].prodDispName !== ""
        ? ReqObj.Form[event.initialdata.tmpId].prodDispName
        : isSet(ReqObj.Form[event.initialdata.tmpId].prodName) &&
          ReqObj.Form[event.initialdata.tmpId].prodName !== ""
        ? ReqObj.Form[event.initialdata.tmpId].prodName
        : "";
  
    var price =
      isSet(ReqObj.Form[event.initialdata.tmpId].price) &&
      ReqObj.Form[event.initialdata.tmpId].price !== ""
        ? ReqObj.Form[event.initialdata.tmpId].price
        : "";
    var pr = "";
    var ut = "";
    if (isSet(price) && price !== "") {
      price = price.replace("₹", "");
      price = price.replace(/Approx(.*?)Rs/, "");
      price = price.replace(/Rs/, "");
      price = price.trim();
      //price = "Rs. " + price;
      pr = price.substring(0, price.indexOf("/")).trim();
      ut = price.substring(price.indexOf("/") + 1);
      if (pr !== "") {
        pr = "&#8377;" + " " + pr + "/"; // don't remove space or use char code
      } else {
        pr = "&#8377;" + ut;
        ut = "";
      }
    }
    //else price = price;
  
    datavalue["price"] = pr;
    datavalue["unit"] = ut;
    datavalue["modrefType"] =
      isSet(ReqObj.Form[event.initialdata.tmpId].modrefType) &&
      ReqObj.Form[event.initialdata.tmpId].modrefType !== ""
        ? ReqObj.Form[event.initialdata.tmpId].modrefType
        : "";
  
    // datavalue["sellerIsq"] = (isSet(ReqObj.Form[event.initialdata.tmpId].sellerIsq) && ReqObj.Form[event.initialdata.tmpId].sellerIsq !== "") ? ReqObj.Form[event.initialdata.tmpId].sellerIsq : "";
    datavalue["plsqArr"] =
      isSet(ReqObj.Form[event.initialdata.tmpId].plsqArr) &&
      ReqObj.Form[event.initialdata.tmpId].plsqArr !== ""
        ? ReqObj.Form[event.initialdata.tmpId].plsqArr
        : "";
  
    return datavalue;
  }
  
  function prodDetailsHtmlInsertion(event) {
    prodDetailsHtmlDefautls(event);
    prodNameHtmlInsertion(event);
    compNameHtmlInsertion(event);
    prodPriceHtmlInsertion(event);
    soldByHtmlInsertion(event);
  
    if (
      pdpenqImage(event.initialdata.tmpId) ||
      (direnqImage(event.initialdata.tmpId) )
    ) {
      isqQuestionHtmlInsertion(event);
    } else if (
      event.initialdata.typeofform === "image" &&
      isEcomProduct(event.initialdata.tmpId) &&
      event.initialdata.step === "0R"
    ) {
    } else if (
      (event.initialdata.typeofform === "image" ||
        event.initialdata.typeofform === "video") &&
      event.initialdata.step === "0R"
    ) {
      if (imeshExist() !== "")
        $(
          "#t" + event.initialdata.tmpId + "_isqdetails" + event.initialdata.step
        ).html(msg_firimgvid("Enquire now", event.initialdata.tmpId));
    } else {
      isqQuestionHtmlInsertion(event);
    }
    prodDetailshandleCSS(event);
  }
  
  function prodDetailsHtmlDefautls(event) {
    // $('#t' + event.initialdata.tmpId + '_isqdetails' + event.initialdata.step).html("");
    $("#t" + event.initialdata.tmpId + "_Prodname" + event.initialdata.step).html( "");
    $("#t" + event.initialdata.tmpId + "_Compname" + event.initialdata.step).html( "");
    $("#t" + event.initialdata.tmpId + "_price" + event.initialdata.step).html( "");
    $("#t" + event.initialdata.tmpId + "_unit" + event.initialdata.step).html("");
    $("#t" + event.initialdata.tmpId + "_sold" + event.initialdata.step).html("");
    $("#t" + event.initialdata.tmpId + "_addr" + event.initialdata.step).html("");
    $( "#t" + event.initialdata.tmpId + "_isqdetails" + event.initialdata.step).html("");
  }
  
  function enqImghandleBuutton(tmpId) {
    var x = returnEnquireNowHtml(tmpId);
    var html = x["OuterWrapper"] + x["Label"] + x["ClosingWrapper"];
    $("#t" + tmpId + "_submitdiv").removeClass("befstgo2 bearrowN");
    $("#t" + tmpId + "_submit")
      .removeClass("form-btn")
      .addClass("befstgo2 hovsub")
      .val("Enquire Now");
    $("#t" + tmpId + "_bl_form").html(html);
  }
  
  function returnProdCnameUrlHtml(tmpId, key, val, id, cls) {
    var svg = "";
    if (glmodid == "PRODDTL" && key == "produrl") {
      svg = `<svg fill="#2e3192" xmlns="http://www.w3.org/2000/svg"  viewBox="0 -3 24 24" width="17px" height="17px"><path d="M 5 3 C 3.9069372 3 3 3.9069372 3 5 L 3 19 C 3 20.093063 3.9069372 21 5 21 L 19 21 C 20.093063 21 21 20.093063 21 19 L 21 12 L 19 12 L 19 19 L 5 19 L 5 5 L 12 5 L 12 3 L 5 3 z M 14 3 L 14 5 L 17.585938 5 L 8.2929688 14.292969 L 9.7070312 15.707031 L 19 6.4140625 L 19 10 L 21 10 L 21 3 L 14 3 z"/></svg>`;
    }
    if (
      isImageVidEnq(tmpId) &&
      isSet(ReqObj.Form[tmpId].redirectUrl) &&
      isSet(ReqObj.Form[tmpId].redirectUrl[key]) &&
      ReqObj.Form[tmpId].redirectUrl[key] !== ""
    ) {
      return (
        "<a href = '" +
        ReqObj.Form[tmpId].redirectUrl[key] +
        "' target = '_blank' class='enqa " +
        cls +
        "'id = 't" +
        tmpId +
        id +
        "'>" +
        val +
        " " +
        svg +
        "</a>"
      );
    } else {
      return val;
    }
  }
  
  function urlTrack(tmpId, msg) {
    if (glmodid == "PRODDTL" && msg == "Redirect:ProductUrl") {
      blenqGATracking("Product_Name_Clicked", msg, getEventLabel(), 0, tmpId);
      return true;
    }
    var formtype =isSet(ReqObj.Form[tmpId].formType) && ReqObj.Form[tmpId].formType.toLowerCase() === "bl" ? "Post Buy Leads": "Send Enquiry";
    blenqGATracking(formtype, msg, getEventLabel(), 1, tmpId);
    return true;
  }
  
  function addZoomImageEvent(event) {
    var tmpId = event.target.id.substring(1, 5);
  
    var magnifying_area = $("#t" + tmpId + "_prodimg");
    var magnifying_img = $("#t" + tmpId + "_zoomimage");
  
    var offsetCor = magnifying_area.position();
  
    if (!isSet(offsetCor) || !isSet(offsetCor.left) || !isSet(offsetCor.top)) {
      return;
    }
  
    clientX = event.clientX - offsetCor.left;
    clientY = event.clientY - offsetCor.top;
  
    mWidth = magnifying_area.outerWidth();
    mHeight = magnifying_area.outerHeight();
  
    clientX = (clientX / mWidth) * 100;
    clientY = (clientY / mHeight) * 100;
  
    magnifying_img.css(
      "transform",
      "translate(-" + clientX + "%, -" + clientY + "%) scale(2)"
    );
  }
  
  function removeZoomImageEvent(event) {
    var tmpId = event.target.id.substring(1, 5);
  
    var magnifying_img = $("#t" + tmpId + "_zoomimage");
  
    magnifying_img.css("transform", "translate(-50%, -50%) scale(1)");
  }
  
  function addEventZoom(tmpId) {
    ReqObj.Form[tmpId].clicked = true;
    var magnifying_area = $("#t" + tmpId + "_prodimg");
    var magnifying_img = $("#t" + tmpId + "_zoomimage");
  
    magnifying_area.css("cursor", "zoom-out");
    magnifying_img.css("transform", "translate(-50%, -50%) scale(2)");
  
    magnifying_area.on("mousemove", addZoomImageEvent);
    magnifying_area.on("mouseleave", removeZoomImageEvent);
  }
  
  function removeEventZoom(tmpId) {
    ReqObj.Form[tmpId].clicked = false;
    var magnifying_area = $("#t" + tmpId + "_prodimg");
    var magnifying_img = $("#t" + tmpId + "_zoomimage");
  
    magnifying_area.css("cursor", "zoom-in");
    magnifying_img.css("transform", "translate(-50%, -50%) scale(1)");
  
    magnifying_area.off("mousemove", addZoomImageEvent);
    magnifying_area.off("mouseleave", removeZoomImageEvent);
  }
  
  function attachEvents(event) {
    var step = event.initialdata.step;
    var tmpId = event.initialdata.tmpId;
    $("a#t" + tmpId + "_ie_prod_" + step).on("click", function () {
      urlTrack(tmpId, "Redirect:ProductUrl", step);
    });
    $("a#t" + tmpId + "_ie_cmp_" + step).on("click", function () {
      urlTrack(tmpId, "Redirect:CompanyUrl");
    });
  
    var magnifying_area = $("#t" + tmpId + "_prodimg");
    if (isSet(magnifying_area) && step[1] === "L" && (pdpenqImage(tmpId) || direnqImage(tmpId))) {
      magnifying_area.css("cursor", "zoom-in");
      ReqObj.Form[tmpId].clicked = false;
  
      magnifying_area.on("click", function (event) {
        if (
          event.target.id === "" ||
          event.target.id.substring(5) === "_beleft" ||
          event.target.id.substring(5) === "_beright"
        ) {
        } else if (!ReqObj.Form[tmpId].clicked) {
          addEventZoom(tmpId);
        } else {
          removeEventZoom(tmpId);
        }
      });
    }
  }
  
  function prodNameHtmlInsertion(event) {
    if (
      event.datavalue["modrefType"] !== "company" &&
      event.datavalue["prod_name"] !== ""
    ) {
      $("#t" + event.initialdata.tmpId + "_Prodname" + event.initialdata.step)
        .html(
          returnProdCnameUrlHtml(
            event.initialdata.tmpId,
            "produrl",
            event.datavalue["prod_name"],
            "_ie_prod_" + event.initialdata.step,
            "enqprd"
          ),
          "enqprd"
        )
        .removeClass("bedsnone")
        .addClass("be-pnm");
    }
  }
  
  function compNameHtmlInsertion(event) {
    if (
      event.datavalue["modrefType"] === "company" ||
      (event.datavalue["modrefType"] !== "company" &&
        event.datavalue["prod_name"] === "")
    ) {
      var class_name =
        event.datavalue["prod_name"] === "" ? "eprod be-pnm" : "be-pnm";
      $("#t" + event.initialdata.tmpId + "_Compname" + event.initialdata.step)
        .html(
          returnProdCnameUrlHtml(
            event.initialdata.tmpId,
            "produrl",
            event.datavalue["comp_name"]
          ),
          "_ie_prod_" + event.initialdata.step,
          "enqprd"
        )
        .removeClass("bedsnone befs14 be-inbl")
        .addClass(class_name);
    }
  }
  
  function prodPriceHtmlInsertion(event) {
    $("#t" + event.initialdata.tmpId + "_price" + event.initialdata.step).html(
      event.datavalue["price"]
    );
    $("#t" + event.initialdata.tmpId + "_unit" + event.initialdata.step).html(
      event.datavalue["unit"]
    );
  }
  
  function soldByHtmlInsertion(event) {
    // if (event.datavalue["modrefType"] !== "company" && event.datavalue["prod_name"] !== "") {
    if (
      event.datavalue["comp_name"] !== "" ||
      event.datavalue["city"] !== "" ||
      event.datavalue["state"] !== ""
    ) {
      $("#t" + event.initialdata.tmpId + "_sold" + event.initialdata.step).html(
        "Sold By - "
      );
      if (event.datavalue["comp_name"] !== "") {
        $("#t" + event.initialdata.tmpId + "_addr" + event.initialdata.step).html(
          returnProdCnameUrlHtml(
            event.initialdata.tmpId,
            "cmpUrl",
            event.datavalue["comp_name"],
            "_ie_cmp_" + event.initialdata.step,
            "enqcmp"
          )
        );
      }
      if (event.datavalue["city"] !== "") {
        $(
          "#t" + event.initialdata.tmpId + "_addr" + event.initialdata.step
        ).append(", " + event.datavalue["city"]);
      }
      if (event.datavalue["state"] !== "") {
        $(
          "#t" + event.initialdata.tmpId + "_addr" + event.initialdata.step
        ).append(", " + event.datavalue["state"]);
      }
    } else
      $("#t" + event.initialdata.tmpId + "_sold" + event.initialdata.step).html(
        ""
      );
  
    // }
  }
  //fsdgsdgsdhgs
  function isqQuestionHtmlInsertion(event) {
    var plsqArr = decodeURIComponent(event.datavalue["plsqArr"]);
    if (isSet(plsqArr) && plsqArr !== "" && !isMoglixUi(event.initialdata.tmpId)) {
      var count = 0;
      var keyVal = plsqArr.split("#");
      var len = keyVal.length;
      var total = 225;
      for (var i = 0; i < len; i++) {
        var selisq = keyVal[i].split(":");
        var ques = selisq[0];
        var varr = selisq[1];
        if (isSet(ques) && ques !== "" && isSet(varr) && varr !== "") {
          var ans = ques + "" + varr;
          var count_val = pdpenqImage(event.initialdata.tmpId) || direnqImage(event.initialdata.tmpId) ? 3 : 4;
          var col_cls1 = pdpenqImage(event.initialdata.tmpId) || direnqImage(event.initialdata.tmpId) ? "eqRC4" : isMoglixUi(event.initialdata.tmpId) ? "" : "col111";
          var col_cls2 = pdpenqImage(event.initialdata.tmpId) || direnqImage(event.initialdata.tmpId) ? "eqRC3" : isMoglixUi(event.initialdata.tmpId) ? "e_clr2" : "col77";
          if (ans.length < total && count < count_val) {
            $(
              "#t" +
                event.initialdata.tmpId +
                "_isqdetails" +
                event.initialdata.step
            ).append(
              "<p class='" +
                col_cls1 +
                "'>" +
                returnSpan(
                  "t" + event.initialdata.tmpId,
                  "_isqkey" + i,
                  ques + ": ",
                  col_cls2,
                  ""
                ) +
                varr +
                "</p>"
            );
            total = total - ans.length;
            count++;
          } else break;
        }
      }
    }
  }
  
  function prodDetailshandleCSS(event) {
    var cl = isMoglixUi(event.initialdata.tmpId)
      ? "be-pnm eprod BL_Fwb e_f18"
      : "eprod";
    var ppricecl = isMoglixUi(event.initialdata.tmpId)
      ? "eqprodpr bemt10 bemb5"
      : "eqprodpr";
    var pricecl = isMoglixUi(event.initialdata.tmpId)
      ? "eqpr e_f20 e_clr1 BL_Fwb"
      : "eqpr";
    var unitcl = isMoglixUi(event.initialdata.tmpId) ? "e_clr2" : "";
    $(
      "#t" + event.initialdata.tmpId + "_Prodname" + event.initialdata.step
    ).addClass(cl);
    $(
      "#t" + event.initialdata.tmpId + "_price" + event.initialdata.step
    ).addClass(pricecl);
    $("#t" + event.initialdata.tmpId + "_unit" + event.initialdata.step).addClass(
      unitcl
    );
    $("#t" + event.initialdata.tmpId + "_ProdPrice" + event.initialdata.step)
      .removeClass()
      .addClass(ppricecl);
    $("#t" + event.initialdata.tmpId + "_sold" + event.initialdata.step).addClass(
      "eqsold"
    );
    $("#t" + event.initialdata.tmpId + "_soldBy" + event.initialdata.step)
      .removeClass()
      .addClass("eqsoldby");
    
    if(direnqImage(event.initialdata.tmpId)){
      
        $("#t" + event.initialdata.tmpId + "_sold" + event.initialdata.step).removeClass().addClass("sldby");
        $("#t" + event.initialdata.tmpId + "_addr" + event.initialdata.step).addClass("sldby");
    
      }
    
    
    
    //$("#t" + event.initialdata.tmpId + "_isqdetails" + event.initialdata.step).addClass("befs16 berow");
  }
  /*--------------------------------------------------------------ARROW UI and EVENTS--------------------------------------------------------- */
  function hideAllArrows(event, type) {
    var clickeve = event;
    var append =
      isSet(clickeve.cttype) && clickeve.cttype.toLowerCase() === "video"
        ? "Video"
        : "";
    $("#t" + event.initialdata.tmpId + "_bedown").addClass("bedsnone");
    $("#t" + event.initialdata.tmpId + "_beup").addClass("bedsnone");
    $("#t" + event.initialdata.tmpId + "_beright" + append).addClass("bedsnone");
    $("#t" + event.initialdata.tmpId + "_beleft" + append).addClass("bedsnone");
    $("#t" + event.initialdata.tmpId + "_berightVideo").addClass("bedsnone");
    $("#t" + event.initialdata.tmpId + "_beleftVideo").addClass("bedsnone");
  }
  
  function showHideArrow(clickeve, todo) {
    var append =
      isSet(clickeve.cttype) && clickeve.cttype.toLowerCase() === "video"
        ? "Video"
        : "";
    $("#t" + clickeve.initialdata.tmpId + "_beup").removeClass("bedsnone");
    $("#t" + clickeve.initialdata.tmpId + "_beleft" + append).removeClass(
      "bedsnone"
    );
  
    if (todo === "down") {
      $("#t" + clickeve.initialdata.tmpId + "_bedown")
        .removeClass("bedsnone")
        .off("click")
        .on(
          "click",
          {
            receivingData: clickeve,
          },
          moveDownImage
        );
      $("#t" + clickeve.initialdata.tmpId + "_beright" + append)
        .off("click")
        .on(
          "click",
          {
            receivingData: clickeve,
          },
          moveDownImage
        );
      $("#t" + clickeve.initialdata.tmpId + "_beup").addClass("bedsnone");
      $("#t" + clickeve.initialdata.tmpId + "_beleft" + append).addClass(
        "bedsnone"
      );
    } else if (todo === "up") {
      $("#t" + clickeve.initialdata.tmpId + "_beup")
        .removeClass("bedsnone")
        .off("click")
        .on(
          "click",
          {
            receivingData: clickeve,
          },
          moveUpImage
        );
      $("#t" + clickeve.initialdata.tmpId + "_beleft" + append)
        .off("click")
        .on(
          "click",
          {
            receivingData: clickeve,
          },
          moveUpImage
        );
      $("#t" + clickeve.initialdata.tmpId + "_bedown").addClass("bedsnone");
      $("#t" + clickeve.initialdata.tmpId + "_beright" + append).addClass(
        "bedsnone"
      );
    } else if (todo === "between") {
      $("#t" + clickeve.initialdata.tmpId + "_beright" + append)
        .off("click")
        .on(
          "click",
          {
            receivingData: clickeve,
          },
          moveDownImage
        );
      $("#t" + clickeve.initialdata.tmpId + "_bedown")
        .removeClass("bedsnone")
        .off("click")
        .on(
          "click",
          {
            receivingData: clickeve,
          },
          moveDownImage
        );
      $("#t" + clickeve.initialdata.tmpId + "_beleft" + append)
        .off("click")
        .on(
          "click",
          {
            receivingData: clickeve,
          },
          moveUpImage
        );
      $("#t" + clickeve.initialdata.tmpId + "_beup")
        .removeClass("bedsnone")
        .off("click")
        .on(
          "click",
          {
            receivingData: clickeve,
          },
          moveUpImage
        );
    }
  }
  
  function moveUpImage(event) {
    //var items = $("imgslider.item-im");
    var key = event.data.receivingData.mediakey.key;
    var index = event.data.receivingData.mediakey.startingindex;
    var formType =
      ReqObj.Form[
        event.data.receivingData.initialdata.tmpId
      ].formType.toLowerCase() === "enq"
        ? "Send Enquiry"
        : "Post Buy Leads";
    //var from = index + 1;
    index = index - 1;
    //blenqGATracking(formType, ReqObj.Form[event.data.receivingData.initialdata.tmpId].ctaName + "|next_" + from + "to" + index + "|total-" + event.data.receivingData.mediakey.key.length, getEventLabel(), 0, event.data.receivingData.initialdata.tmpId);
    var tmpObj = returnUpdatedData(index, event);
    tmpObj.index = index; //
    event.data.receivingData.mediakey.startingindex = index;
    if (tmpObj.type.toLowerCase() === "video") {
      event.data.receivingData["cttype"] = "video";
      event.data.receivingData["vidUrl"] = tmpObj["vidUrl"];
      $(
        "#t" + event.data.receivingData.initialdata.tmpId + "_imglodr"
      ).removeClass("bedsnone");
    } else {
      event.data.receivingData["cttype"] = "image";
      $("#t" + event.data.receivingData.initialdata.tmpId + "_imglodr").addClass(
        "bedsnone"
      );
    }
    event.data.receivingData.initialdata.obj.insertIntoProdMediaHtml(
      event.data.receivingData,
      "slider",
      "#t" + event.data.receivingData.initialdata.tmpId + "_slider" + index
    );
  }
  
  function moveDownImage(event) {
    //var items = $("imgslider.item-im");
    var key = event.data.receivingData.mediakey.key;
    var index = parseInt(event.data.receivingData.mediakey.startingindex);
    var formType =
      ReqObj.Form[event.data.receivingData.initialdata.tmpId].formType === "Enq"
        ? "Send Enquiry"
        : "Post Buy Leads";
    var len = event.data.receivingData.mediakey.key.length;
    index = index + 1;
    //blenqGATracking(formType, ReqObj.Form[event.data.receivingData.initialdata.tmpId].ctaName + "|prev_" + from + "to" + index + "|total-" + event.data.receivingData.mediakey.key.length, getEventLabel(), 0, event.data.receivingData.initialdata.tmpId);
    var tmpObj = returnUpdatedData(index, event);
    tmpObj.index = index;
    event.data.receivingData.mediakey.startingindex = index;
    if (tmpObj.type.toLowerCase() === "video") {
      event.data.receivingData["cttype"] = "video";
      event.data.receivingData["vidUrl"] = tmpObj["vidUrl"];
      $(
        "#t" + event.data.receivingData.initialdata.tmpId + "_imglodr"
      ).removeClass("bedsnone");
    } else {
      $("#t" + event.data.receivingData.initialdata.tmpId + "_imglodr").addClass(
        "bedsnone"
      );
      event.data.receivingData["cttype"] = "image";
    }
    event.data.receivingData.initialdata.obj.insertIntoProdMediaHtml(
      event.data.receivingData,
      "slider",
      "#t" + event.data.receivingData.initialdata.tmpId + "_slider" + index
    );
  }
  
  function returnUpdatedData(index, event) {
    return event.data.receivingData.mediakey.key[index];
  }
  /*----------------------------------------------------------------------------------------------------------------------------------------------- */
  /*
   * Usage :
   *
   *
   */
  
  function PostBlEnqUpdate() {
    this.className = "PostBlEnqUpdate";
  }
  PostBlEnqUpdate.prototype.onSubmit = function (tmpId) {
    if (isSet(tmpId)) {
      var postblenq = PreAjax("PostBlEnqUpdate", tmpId);
      this.sendRequest(postblenq, tmpId);
    }
  };
  //PostBlEnqUpdate.prototype.defaultEvents = function () {};
  PostBlEnqUpdate.prototype.getData = function (tmpId) {
    var data = {};
    var imeshcookie = imeshExist();
    var iploccookie = usercookie.getCookie("iploc");
  
    data["modId"] = ReqObj.Form[tmpId].modId;
    data["s_ip"] = usercookie.getParameterValue(iploccookie, "gip");
    data["s_ip_country"] = usercookie.getParameterValue(iploccookie, "gcnnm");
    data["s_ip_country_iso"] = usercookie.getParameterValue(
      iploccookie,
      "gcniso"
    );
    var temp = usercookie.getParameterValue(imeshcookie, "fn");
    if (temp === "") {
      var name = ReqObj.UserDetail["fn"];
      if (name) {
        if (name.indexOf(" ") !== -1) {
          var fn = name.substr(0, name.indexOf(" "));
          var ln = name.substr(name.indexOf(" ") + 1);
        }
      }
      data["s_first_name"] = fn !== "" && typeof fn !== "undefined" ? fn : name;
      data["s_last_name"] = ln !== "" && typeof ln !== "undefined" ? ln : "";
    } else data["s_first_name"] = temp;
  
    temp = usercookie.getParameterValue(imeshcookie, "em");
    data["s_email"] = temp === "" ? ReqObj.UserDetail["em"] : temp;
  
    temp = usercookie.getParameterValue(imeshcookie, "mb1");
    data["s_mobile"] = temp === "" ? ReqObj.UserDetail["mb1"] : temp;
  
    data["s_city_name"] = ReqObj.UserDetail["cityname"];
    data["s_glusrid"] = usercookie.getParameterValue(imeshcookie, "glid");
  
    data["s_country_name"] = usercookie.getParameterValue(iploccookie, "gcnnm");
    data["generationId"] = ReqObj.Form[tmpId].generationId;
    data["s_city_id"] = ReqObj.UserDetail["ctid"];
    data["flag"] = IsChatbl(tmpId) ? "BL" : ReqObj.Form[tmpId].formType;
  
    if (currentISO() === "IN") {
      data["s_state_name"] =
        isSet(ReqObj.UserDetail["statename"]) &&
        ReqObj.UserDetail["statename"] !== ""
          ? ReqObj.UserDetail["statename"]
          : "";
    }
    if (ReqObj.Form[tmpId].formType === "Enq") {
      data["r_glusrid"] = ReqObj.Form[tmpId].rcvGlid;
      data["rfq_queryDestination"] = ReqObj.Form[tmpId].query_destination;
    }
  
    return ObjectTrim(data);
  };
  PostBlEnqUpdate.prototype.sendRequest = function (postblenq, tmpId) {
    var data = this.getData(tmpId);
    if (ValidGenId(ReqObj.Form[tmpId].generationId))
      fireAjaxRequest({
        data: {
          ga: {
            gatype: "PostBlenqUpdate",
            source: "",
            s: true,
            f: true,
          },
          tmpId: tmpId,
          ajaxObj: {
            obj: postblenq,
            s: {
              ss: 1,
              sf: {
                af: 0,
                pa: 1,
              },
              f: 1,
            },
            f: {
              f: 1,
            },
          },
          ajaxtimeout: 0,
          ajaxdata: data,
          hitfinserv: "",
          type: 2,
        },
      });
    else PostAjax(postblenq, tmpId);
  };
  
  function makeObj(Obj, hooks) {
    if (ConstructorName(Obj) !== "") {
      var returnObj = {};
      var KeysArray = GetObjectKeys(hooks);
      if (isSet(Obj)) returnObj["fn"] = Obj;
      for (var i in KeysArray) {
        if (isSet(hooks[KeysArray[i]]))
          returnObj[KeysArray[i]] = hooks[KeysArray[i]];
        else returnObj[KeysArray[i]] = [];
      }
      returnObj["cb"] = [];
      return returnObj;
    } else {
      return {};
      // debugger;
    }
  }
  
  function ReplaceObject(Objconfig, tmpId, that) {
    if (!Objconfig.isService) {
      if ( Objconfig.toReplace && !(that.GetExistingObject(ConstructorName(Objconfig.obj), tmpId) === false)) {
        Objconfig.obj = Objconfig.arrays.UiArray[i][j].Obj;
      }
    }
  }
  function FindObject(arr, name, obj) {
    if (isSet(arr) && isSet(name)) {
      for (var i = 0; i < arr.length; i++) {
        if ( isSet(arr[i]) && isSet(arr[i].fn) && ConstructorName(arr[i].fn).toLowerCase() === name.toLowerCase()) {
          if (obj.toReplace) {
            arr[i] = obj.ReplaceObj;
          }
          return false;
        } else {
          if (isSet(arr[i]) && FindObject(arr[i].cb, name, obj) === false) {
            return false;
          }
        }
        // }
      }
    }
  }
  //upto here
  
  function FindCorrectSpot(arr, PushObject, parent) {
    if (isSet(arr)) {
      for (var i = 0; i < arr.length; i++) {
        if (isSet(arr[i].fn) && ConstructorName(arr[i].fn).toLowerCase() === parent.toLowerCase()) {
          arr[i].cb.push(PushObject);
          return true;
        } else {
          if (FindCorrectSpot(arr[i].cb, PushObject, parent) === true) {
            return true;
          }
        }
        // }
      }
    }
  }
  
  function ExistsInArray(arr, parent) {
    if (isSet(arr)) {
      for (var i = 0; i < arr.length; i++) {
        if (isSet(arr[i].fn) && ConstructorName(arr[i].fn).toLowerCase() === parent.toLowerCase()) {
          return true;
        } else {
          if (ExistsInArray(arr[i].cb, parent) === true) {
            return true;
          }
        }
        // }
      }
    }
  }
  
  function findParent(name) {
    var parent = "";
    for (var key in TreeConfig) {
      if (key.toLowerCase() === name.toLowerCase()) {
        parent = TreeConfig[key];
        break;
      }
    }
    return parent;
  }
  
  function AttachObject(Objconfig) {
    // console.log("Attach obj " + Objconfig);
    if (isSet(Objconfig)) {
      if (!Objconfig.isService)
        Objconfig.array.UiArray.push({
          id: Objconfig.objHtmlId,
          Obj: Objconfig.obj,
        });
  
      if (
        FindObject(
          Objconfig.array.ServiceArray,
          ConstructorName(Objconfig.obj),
          Objconfig
        ) === false
      ) {
        // console.log("duplicate", Objconfig.obj);
      } else {
        var parent = findParent(ConstructorName(Objconfig.obj));
        parent = isSet(parent) ? parent : [];
  
        Objconfig.obj = makeObj(Objconfig.obj, Objconfig.hooks);
        var ObjInsertedOnce = false;
  
        if (parent.length > 0) {
          for (var i = 0; i < parent.length; i++) {
            if (
              FindCorrectSpot(
                Objconfig.array.ServiceArray,
                Objconfig.obj,
                parent[i]
              ) === true
            )
              ObjInsertedOnce = true;
            else if (i === parent.length - 1 && !ObjInsertedOnce)
              Objconfig.array.ServiceArray.push(Objconfig.obj);
          }
        } else Objconfig.array.ServiceArray.push(Objconfig.obj);
      }
    }
  }

  function blInlineTransition(tmpId) {
    //adwords_ch
    if (isBlInlineFr(tmpId)) {
      var pgtp = "Exporters";
      if (
        typeof ims !== "undefined" &&
        isSet(ims) &&
        isSet(ims.pageType) &&
        ims.pageType !== ""
      ) {
        pgtp = ims.pageType === "Service" ? "Service Providers" : "Exporters";
      }
  
      $("#t" + tmpId + "_sidePanel")
        .html(
          '<p class="fs18">Looking to source <span id="t' +
            tmpId +
            '_mcatNameAdw" class="bo fstit">' +
            ReqObj.Form[tmpId].mcatName +
            '</span> from India?</p><p class="fs16 fmt15">Verified ' +
            pgtp +
            ' are just a click away <span>→</span></p><hr class="spt"> <p class="fs13 bo">IndiaMART is India\'s largest online B2B marketplace<br>Connecting Global Buyers with Indian Exporters</p>'
        )
        .removeClass()
        .addClass("fAdl fs0 wf");
  
      $("#t" + tmpId + "_contactdiv").remove();
      $("#t" + tmpId + "_wrpDiv")
        .removeClass()
        .addClass("fAdm df");
      $("#t" + tmpId + "_sidePanel")
        .siblings()
        .removeClass()
        .addClass("fAdr flx1");
      $("#t" + tmpId + "_hdg").html("");
      $("#t" + tmpId + "_inlineBL").removeClass();
      return;
    }
    if (isGlIdEven(tmpId)) {
      var contact_html = "";
      if (imeshExist() != "") {
        var name =
          isSet(ReqObj.UserDetail["fn"]) && ReqObj.UserDetail !== ""
            ? ReqObj.UserDetail["fn"].length <= 15
              ? ReqObj.UserDetail["fn"]
              : ReqObj.UserDetail["fn"].substr(0, 12) + "..."
            : "";
        var gdClass =
          ReqObj.UserDetail["fn"] !== ""
            ? "inCrl pdinb ml5 gd"
            : "inCrl pdinb ml5 gd dn";
        var primary_info =
          currentISO() !== "IN"
            ? ReqObj.UserDetail["em"]
            : "+91-" + ReqObj.UserDetail["mb1"];
        var secondary_info =
          currentISO() !== "IN"
            ? ReqObj.UserDetail["mb1"]
            : ReqObj.UserDetail["em"];
        contact_html =
          '<div class="be-fhdg clr_blue" id="t' +
          tmpId +
          '_hdg1">' +
          getBLHeading(tmpId, "") +
          '</div><div class="idsf id_aic inUsrh icrP pr ipb10 ml5 bemt5"><span class="' +
          gdClass +
          '"></span> <span class="pdinb ml5 befs14">' +
          name +
          '</span> <span class="pdinb ml5 inAr"></span><div class="inUsrM p15"><div><b>Your Contact Information</b></div><span class="idb">' +
          ReqObj.UserDetail["fn"] +
          '</span> <span class="idb">' +
          primary_info +
          '</span> <span class="idb">' +
          secondary_info +
          "</span></div></div>";
      } else {
        contact_html =
          '<div class="be-fhdg clr_blue" id="t' +
          tmpId +
          '_hdg1">' +
          getBLHeading(tmpId, "") +
          "</div>";
      }
      $("#t" + tmpId + "_sidePanel").addClass("bedsnone");
      $("#t" + tmpId + "_inlineBL")
        .removeClass()
        .addClass("inEql mr20 ibgc p15_25 bdr5 inBxSh iwd100 pr");
      $("#t" + tmpId + "_contactdiv").html(contact_html);
      $("#t" + tmpId + "_wrpDiv").removeClass("betbl");
      ReqObj.Form[tmpId].screenNumber < 0
        ? $("#t" + tmpId + "_hdg").addClass("bedsnone")
        : ReqObj.Form[tmpId].currentScreen.toLowerCase() !== "userverification"
        ? $("#t" + tmpId + "_hdg").removeClass("bedsnone")
        : "";
      $("#t" + tmpId + "_belodr").css("width", "100%");
    } else {
      $("#t" + tmpId + "_sidePanel").removeClass("bedsnone");
      $("#t" + tmpId + "_inlineBL")
        .removeClass()
        .addClass("be-mdleWrap belft betbl bebxs bebdr1");
      $("#t" + tmpId + "_contactdiv").html("");
      $("#t" + tmpId + "_belodr").removeAttr("style");
      $("#t" + tmpId + "_hdg").removeClass("bedsnone");
    }
  }
  function InitiateSequence(tmpId, where) {
    GetIsqFromService(tmpId);
    ReqObj.Form[tmpId].FormSequence = new FormSeq();
    ReqObj.Form[tmpId].FormSequence.FirstStepSequence(tmpId, where);
    FormCloseButtons(tmpId);
  }
  
  function OpenBLEnqPopup(tmpId) {
    isBLFormOpen = true;
    var imeshcookie = imeshExist();
    $("#t" + tmpId + "_leftS").removeAttr("style");
    if (!pdpenqImage(tmpId)) {
      $("#t" + tmpId + "_thankDiv").removeClass("eqTst eqRes");
      $("#t" + tmpId + "_mcont").removeClass("eqTst eqRes");
    }
    if (ReqObj.Form[tmpId].formType.toLowerCase() === "enq") {
      if (imeshcookie === "") $("#t" + tmpId + "_leftR").addClass("lftMgn");
      else if (!pdpInactiveBL(tmpId))
        $("#t" + tmpId + "_leftR").removeClass("lftMgn");
      $("#t" + tmpId + "_thankDiv").addClass("oEq");
      $("#t" + tmpId + "_mcont").addClass("oEq");
      $("#t" + tmpId + "_mcont").removeClass("eqImSec");
      $("#t" + tmpId + "_thankDiv").removeClass("eqImSec");
      if (currentISO() !== "IN") $("#t" + tmpId + "_thankDiv").addClass("fnUser");
    } else {
      if (
        ReqObj.Form[tmpId].formType.toLowerCase() === "bl" &&
        tmpId.substring(0, 2) === "09"
      ) {
        $("#t" + tmpId + "_thankDiv").removeClass("eqImSec");
        $("#t" + tmpId + "_mcont").addClass("blder");
      } else {
        $("#t" + tmpId + "_mcont").removeClass("blder");
      }
      $("#t" + tmpId + "_mcont").removeClass("oEq");
      $("#t" + tmpId + "_thankDiv").removeClass("oEq");
      if (currentISO() !== "IN")
        $("#t" + tmpId + "_thankDiv").removeClass("fnUser");
      if (imeshcookie === "") $("#t" + tmpId + "_leftR").removeClass("lftMgn");
      else $("#t" + tmpId + "_leftR").removeClass("lftMgn");
    } // resizing
    if (               //bl-inline bug
        ReqObj.Form[tmpId].formType.toLowerCase() === "bl" &&
        tmpId.substring(0, 2) === "01"
      ){
        $("#t" + tmpId + "_thankDiv").removeClass("eqImSec");
      }
    if (currentISO() === "IN") $("#t" + tmpId + "_thankDiv").removeClass("nfusr");
    $("#t" + tmpId + "_thankDiv").removeClass("BL_Thnky");
    $("#t" + tmpId + "_bewrapper")
      .removeClass("bedsnone")
      .css({
        display: "block",
      });
    if (!isMoglixUi(tmpId)) {
      $("#t" + tmpId + "_blkwrap").removeClass("e_bgc");
      $("#t" + tmpId + "_bewrapper").removeClass("e_opn");
      if ($("#t" + tmpId + "OtpMainHeading").hasClass("e_hdg"))
        $("#t" + tmpId + "OtpMainHeading").remove();
      if (
        $("#t" + tmpId + "_mcont")
          .parent()
          .hasClass("e_whm")
      )
        $("#t" + tmpId + "_mcont")
          .parent()
          .removeClass()
          .addClass("be-frmcont");
      if (!ispdp(tmpId)) {
        $("#t" + tmpId + "_mcont").removeClass("bedsnone").css({
          display: "flex",
        });
      } else {
        $("#t" + tmpId + "_mcont").css({
          display: "block",
        });
      }
      $("#t" + tmpId + "_leftsection").removeClass();
      if ($("#t" + tmpId + "_leftR").hasClass("e_p20")) {
        $("#t" + tmpId + "_leftR")
          .removeClass()
          .addClass("be-Rsc be-frmpop");
      }
      if (pdpInactiveBL(tmpId)) {
        $("#t" + tmpId + "_leftR")
          .removeClass()
          .addClass("be-Rsc be-frmpop lftMgn be-Rsc2 cbl_br8");
      }
    } else if (isMoglixUi(tmpId)) {
      $("#t" + tmpId + "_blkwrap").addClass("e_bgc");
      $("#t" + tmpId + "_leftR")
        .removeClass()
        .addClass("e_p20");
      $("#t" + tmpId + "_bewrapper").addClass("e_opn");
      $("#t" + tmpId + "_mcont")
        .parent()
        .removeClass()
        .addClass("e_whm");
      $("#t" + tmpId + "_mcont")
        .removeClass()
        .css({
          display: "",
        });
    }
  
    updateKeyTypeOfForm(tmpId);
    initialiseOuterSection(tmpId); // left and right sections initialisation
    sectionInitialisationStepWise(tmpId, 0); // step wise intialisation
    if (
      !(
        isSet(ReqObj.Form[tmpId].zoomImage) && ReqObj.Form[tmpId].zoomImage !== ""
      ) &&
      ReqObj.mcatdtl.ping === true &&
      ReqObj.mcatdtl.response === false
    )
      $("#t" + tmpId + "_imglodr").removeClass("bedsnone");
    else $("#t" + tmpId + "_imglodr").addClass("bedsnone");
    $("#search_string").blur();
    stopBgScroll();
  }
  
  
  
  function ClearBLEnqFormUI(tmpId) {
    if (tmpId.substring(0, 2) === "09") ClearBLEnqPopUpUI(tmpId);
    else ClearBLEnqInlineUI(tmpId);
  }
  
  function AfterFormDefaults(tmpId, flagsugg) {
    ClearSeqArrays(tmpId);
    SetUIElKeys(tmpId, flagsugg);
    ClearBLEnqFormUI(tmpId);
    ReqObj.Form[tmpId].currentclassCount = 0;
    // if ((tmpId.substring(0, 2) === "09" && ReqObj.Form[tmpId].formType.toLowerCase() === "bl" && ReqObj.Form[tmpId].IsProdNameChanged === false) || IsChatbl(tmpId)) {
    if (
      (tmpId.substring(0, 2) === "09" &&
        ReqObj.Form[tmpId].formType.toLowerCase() === "bl") ||
      IsChatbl(tmpId)
    ) {
      leftSideTransition(0, tmpId);
    }
    if (typeof flagsugg === "undefined") {
      ReqObj.changeFlag = false;
    } else ReqObj.changeFlag = true;
    InitiateSequence(tmpId, flagsugg);
  }
  
 
  
  function callGlobalFunction() {
    if (
      typeof ims !== "undefined" &&
      isSet(ims) &&
      isSet(ims.dirTypeFull) &&
      ims.dirTypeFull !== ""
    ) {
      var dirTypeFull = ims.dirTypeFull.toLowerCase();
      if (
        dirTypeFull === "impcat" ||
        dirTypeFull === "city" ||
        dirTypeFull === "search"
      ) {
        if (typeof block_softask === "function") block_softask();
      }
    }
  }
  
  function returnTypeForSeq(tmpId) {
    // inline enq changes
    if (
      tmpId.substring(0, 2) === "04" &&
      ReqObj.Form[tmpId].typeofform === "enquiry"
    )
      return "inenquiry";
    if (Bl04(tmpId)) return "blfirstfold";
    return ReqObj.Form[tmpId].typeofform === "image" ||
      ReqObj.Form[tmpId].typeofform === "video"
      ? "imenquiry"
      : isSet(ReqObj.Form[tmpId].typeofform)
      ? ReqObj.Form[tmpId].typeofform
      : "";
  }
  
  function updateReceivedImage(UpdatedReceivedReqObj) {
    var mcatimage = getImage(UpdatedReceivedReqObj.mcatId);
    if (UpdatedReceivedReqObj.formType.toLowerCase() === "bl") {
      if (UpdatedReceivedReqObj.displayImage !== "") {
        pushImage(
          UpdatedReceivedReqObj.mcatId,
          UpdatedReceivedReqObj.displayImage,
          UpdatedReceivedReqObj.zoomImage
        );
      } else if (mcatimage === "" || typeof mcatimage === "undefined")
        pushImage(
          UpdatedReceivedReqObj.mcatId,
          UpdatedReceivedReqObj.displayImage,
          UpdatedReceivedReqObj.zoomImage
        );
    }
  }
  
  function CallGenService(tmpId) {
    if (GenOnClick(tmpId)) {
      var that = ReqObj.Form[tmpId].FormSequence;
      var array = {
        UiArray: [],
        ServiceArray: [],
      };
      hooks = {
        pre: [],
        post: [],
      };
      var GenObject = returnGenObject(tmpId, array, hooks, that, 0);
      that.MakeSeq(GenObject);
      var IsqObject = {
        object: {
          obj: ReqObj.Form[tmpId].GlobalIsqObject,
          array: array,
          hooks: hooks,
          isService: true,
        },
        tmpId: tmpId,
        that: that,
        AfterService: [],
        hasFallback: false,
        FallbackObj: null,
      };
      that.MakeSeq(IsqObject);
  
      SavePropIsq(tmpId);
  
      formatServices(array.ServiceArray, tmpId);
      ServiceSequenceHit(tmpId, false);
    }
  }  
  function SavePropIsq(tmpId) {
    if (
      isSet(ReqObj.Form[tmpId].userFilledIsq) &&
      ReqObj.Form[tmpId].userFilledIsq instanceof Array
    ) {
      var userFilledIsq = ReqObj.Form[tmpId].userFilledIsq;
  
      for (var j = 0; j < userFilledIsq.length; j++) {
        ReqObj.Form[tmpId].questionsId.push(userFilledIsq[j].questionsId);
        ReqObj.Form[tmpId].questionsDesc.push(userFilledIsq[j].questionsDesc);
        ReqObj.Form[tmpId].optionsId.push(userFilledIsq[j].optionsId);
        ReqObj.Form[tmpId].optionsValue.push(userFilledIsq[j].optionsValue);
      }
    }
  }
  function SetUIElKeys(tmpId, where) {
    IsqKeys(tmpId);
    RdBoxKeys(tmpId);
    if (where !== "from-Form") EnrichKeys(tmpId);
    StaticIsqKeys(tmpId);
    ContactDetailKeys(tmpId);
    ReqObj.Form[tmpId].calledClassName = {};
  }
  
  function GetIsqFromService(tmpId) {
    ReqObj.Form[tmpId].mcatId !== "-1" || ReqObj.Form[tmpId].catId !== "-1"
      ? GetIsq(tmpId)
      : "";
    ReqObj.Form[tmpId].GlobalIsqObject = new Isq(tmpId);
    ReqObj.Form[tmpId].GlobalRdObj = new RequirementDtl(tmpId); // check
  }
  
  function CloseForm(tmpId) {
    if (
      (tmpId.substring(0, 2) === "09" &&
        $("#t" + tmpId + "_bewrapper").css("display") === "block") ||
      (tmpId.substring(0, 2) !== "09" &&
        $("#t" + tmpId + "_enrichform_maindiv").css("display") !== "none")
    ) {
      if (
        ReqObj.Form[tmpId].formType.toLowerCase() === "enq" &&
        !ValidGenId(ReqObj.Form[tmpId].generationId)
      ) {
        ReqObj.finEnq = tmpId;
      } else
        ReqObj.Form[tmpId].formType.toLowerCase() === "enq" &&
        ValidGenId(ReqObj.Form[tmpId].generationId) &&
        !ReqObj.Form[tmpId].flags["isThankYouCalled"]
          ? FinishEnquiryService(tmpId)
          : "";
      // (ReqObj.Form[tmpId].formType.toLowerCase() === "enq" && ((ValidGenId(ReqObj.Form[tmpId].generationId) && !ReqObj.Form[tmpId].flags["isThankYouCalled"]) || ReqObj.Form[tmpId].hitFinishEnquiryService)) ? FinishEnquiryService(tmpId): "";
      if (!isEcomProduct(tmpId)) ServiceSequenceHit(tmpId, false);
      ReqObj.TempMobile = "";
      ReqObj.Form[tmpId].pvTrackingFired = false;
      ReqObj.TempEmail = "";
      ReqObj.ImageVideoIsqSeq = false;
      closeVideo(tmpId);
      SetUserDetails();
      updateToAsk(tmpId);
      addDetachedFlag();
      //detachFlag2(tmpId);
      if (tmpId.substring(0, 2) === "09") {
        if (ispdp(tmpId)) {
          $("#recommendProd").css({
            display: "none",
          });
        }
        $("#t" + tmpId + "_bewrapper").css({
          display: "none",
        });
        ClearBLEnqPopUpUI(tmpId);
      } else if (tmpId.substring(0, 2) === "08") {
        if (IsChatBLInline(tmpId)) {
          $("#t" + tmpId + "_chatBL")
            .addClass("cbl_vh")
            .removeClass("cbl_vv");
          updateChatWidgetGlobalVar(tmpId);
          chatwidgetTransitions(tmpId);
        } else {
          $("#t" + tmpId + "_chatBL").css({
            display: "none",
          });
        }
        ClearBLEnqPopUpUI(tmpId);
        $(".t" + tmpId + "blk_scrn").addClass("dn");
      } else {
        $("#t" + tmpId + "_enrichform_maindiv")
          .html("")
          .css({
            display: "none",
          });
        $("#t" + tmpId + "_q_send_req_button").html(ReqObj.Form[tmpId].btn);
        isSet(ReqObj.Form[tmpId].InlineformParentEl)
          ? ReqObj.Form[tmpId].InlineformParentEl.html(
              ReqObj.Form[tmpId].InlineformHtml
            )
          : "";
        $("#t" + tmpId + "_q_send_req_button")
          .parent()
          .removeClass("bedsnone");
        ReqObj.Form[tmpId].btn = "";
      }
  
      if (!IsChatbl(tmpId)) {
        HideSuggester();
        var HitArray = ReqObj.Form[tmpId].HitArray;
        var enqclose = ReqObj.Form[tmpId].enqSentCallBack;
        if (!(tmpId.substr(0, 2) === "01" && isGlIdEven(tmpId)))
          ReqObj.Form[tmpId] = CopyObject(ReqObj.Original[tmpId]);
        ReqObj.Form[tmpId].HitArray = HitArray;
        ReqObj.Form[tmpId].enqSentCallBack = enqclose;
      }
      ReqObj.ipLoc.onClose = true;
      UpdateSeq();
      ReqObj.loginMode = 0;
      ReqObj.userType = "";
      resumeBgScroll();
      SetUserDetails();
      isBLFormOpen = false;
      $(document).trigger(FormCloseEvent, [ReqObj.Form[tmpId].ordr_qnty_index]);
      $(document).trigger(OnBlEnqClose);
      if (checkblockedUser()) ReqObj.UserDetail.blusrdtl = {};
    }
  }
  
  function closeVideo(tmpId) {
    if ($("#t" + tmpId + "_prodVideo").is("iframe"))
      $("#t" + tmpId + "_prodVideo")[0].contentWindow.postMessage(
        '{"event":"command","func":"' + "stopVideo" + '","args":""}',
        "*"
      );
  }
  
  function SetFormHtmlDefaultValue(tmpId) {
    isnewSSB(tmpId)
      ? ""
      : $("#t" + tmpId + "_thankDiv")
          .html("")
          .addClass("bedsnone");
    // $("#t" + tmpId + "_beprevious").addClass("bedsnone");
    // $("#t" + tmpId + "_qnextbtn").addClass("bedsnone");
  }
  
  function leftSideEmpty(tmpId) {
    $("#t" + tmpId + "_Prodname").html("");
    $("#t" + tmpId + "_Compname").html("");
    $("#t" + tmpId + "_ProdPrice").html("");
    $("#t" + tmpId + "_state").html("");
    $("#t" + tmpId + "_locality").html("");
    $("#t" + tmpId + "_city").html("");
    $("#t" + tmpId + "parent_iframe").html(
      "<div id='t" + tmpId + "_prodVideo' class='belft bepr pdpHg'></div>"
    );
    $(".proctname").html("");
  }
  
  function ClearBLEnqPopUpUI(tmpId) {
    //leftSideEmpty(tmpId);
    if (IsChatbl(tmpId)) {
      $("#t" + tmpId + "_new_chatbl").html("");
      IsChatBLInline(tmpId)
        ? $("#t" + tmpId + "_newblchatReply")
            .html("")
            .addClass("cbl_br10 cbl_bgf1")
            .removeClass("cbl_bg1")
        : $("#t" + tmpId + "_newblchatReply").html("");
      chatblHideTransition(tmpId);
      $("#t" + tmpId + "_blchatfooter").removeClass("focus");
      $("#t" + tmpId + "_changeProduct")
        .removeAttr("disabled")
        .css({
          opacity: "1",
          cursor: "pointer",
        });
      removechatblerror(tmpId);
      //$("#t" + tmpId + "_helptext").addClass("dn");
      // $("#t" + tmpId +"hi").html("");
      $("#t" + tmpId + "hi").addClass("dn");
    }
    $("#t" + tmpId + "_bl_form").html("");
    $("#t" + tmpId + "_byrinfo")
      .addClass("bedsnone")
      .html("");
    $("#t" + tmpId + "_tCond").addClass("bedsnone");
    SetFormHtmlDefaultValue(tmpId);
  }
  
  function ClearBLEnqInlineUI(tmpId) {
    if (isSSB(tmpId)) $("#t" + tmpId + "_thankDiv").html("");
    if (isnewSSB(tmpId))
      $("#t" + tmpId + "_thankDiv")
        .parent()
        .addClass("bedsnone");
    if (IsChatbl(tmpId)) {
      $("#t" + tmpId + "_new_chatbl").html("");
      //$("#t" + tmpId + "_newblchatReply").html("");
    }
    if (!isSSB(tmpId) && !(tmpId.substr(0, 2) === "01" && isGlIdEven(tmpId)))
      $("#t" + tmpId + "_bl_form").html("");
  
    $("#t" + tmpId + "_byrinfoIn")
      .html("")
      .addClass("bedsnone");
  
    $("#t" + tmpId + "_tCond").addClass("bedsnone");
    if (!IsChatbl(tmpId) && !isSSB(tmpId))
      var clr =
        isGlIdEven(tmpId) && tmpId.substr(0, 2) === "01"
          ? ""
          : "background-color : rgb(0, 166, 153)";
    $("#t" + tmpId + "_submit")
      .removeAttr("disabled")
      .attr("style", clr);
    $("#t" + tmpId + "_submit")
      .removeAttr("disabled")
      .attr("style", clr);
    $("#t" + tmpId + "_submitdiv").attr("class", "befstgo1");
  }
  
  function CheckForUpdate() {
    var imeshcookie = imeshExist();
    for (var key in ReqObj.UserDetail) {
      if (
        ReqObj.UserDetail[key] !== usercookie.getParameterValue(imeshcookie, key)
      )
        return true;
    }
    return false;
  }
  
  function ShowOtp(tmpId) {
    var imeshcookie = imeshExist();
    if (
      imeshcookie &&
      usercookie.getParameterValue(imeshcookie, "uv") !== "V" &&
      usercookie.getParameterValue(imeshcookie, "iso") === "IN"
    )
      return true;
    else return false;
  }
  
  function ShowEmail() {
    return !usercookie.getParameterValue(imeshExist(), "em") &&
      currentISO() === "IN"
      ? true
      : false;
  }
  
  function EmailAfterReqbox(tmpId) {
    return isSet(ReqObj.Form[tmpId].emailAfterReqbox) &&
      ReqObj.Form[tmpId].emailAfterReqbox
      ? true
      : false;
  }
  
  if (typeof isIframeApiloaded === "undefined") window["isIframeApiloaded"] = 0;
  
  var new_player = "";
  
  function loadScript() {
    if (isIframeApiloaded === 0) {
      /* global ReqObj.video_url agr enquiry pr aaya then. */ isIframeApiloaded = 1;
      var tag = document.createElement("script");
      tag.src = "https://www.youtube.com/player_api";
      var firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }
  //loadScript();
  function onPlayerStateChange(event) {
    if (event.data !== 1) blStop = 0;
    else blStop = 1;
  }
  
  function ReqImage(key, index) {
    //POPUPCHATBL
    this.displayImage = "";
    this.zoomImage = "";
    this.defaultimg = "";
    this.vidUrl = "";
    this.ctaType = "";
    this.funcToCall = "";
    this.html = "";
    this.src = "";
    this.type = "";
    this.className = "ReqImage";
  }
  ReqImage.prototype.extractValues = function (key, index) {
    if (isSet(key) && isSet(index)) {
      this.displayImage =
        isSet(key[index].displayImage) && key[index].displayImage !== ""
          ? key[index].displayImage
          : "";
      this.zoomImage =
        isSet(key[index].zoomImage) && key[index].zoomImage !== ""
          ? key[index].zoomImage
          : "";
      this.vidUrl =
        isSet(key[index].vidUrl) && key[index].vidUrl !== ""
          ? key[index].vidUrl
          : "";
      this.ctaType =
        isSet(key[index].type) && key[index].type !== "" ? key[index].type : "";
    }
  };
  ReqImage.prototype.displayHtml = function (
    tmpId,
    key,
    index,
    zoomImageLoad,
    imgslider
  ) {
    this.extractValues(key, index, zoomImageLoad);
    this.defaultimg = getDefaultImage(tmpId);
    this.funcToCall =
      typeof ReqObj.Form[tmpId].formType !== "undefined"
        ? ReqObj.Form[tmpId].formType
        : "";
    this.RDatatype =
      typeof ReqObj.Form[tmpId].modrefType !== "undefined"
        ? ReqObj.Form[tmpId].modrefType
        : "";
  
    if (this.ctaType.toLowerCase() === "video") {
      /* video */ if (isSet(imgslider) && imgslider === "vidslider") {
      } else
        $("#t" + tmpId + "parent_iframe").html(
          "<div id='t" + tmpId + "_prodVideo' class='belft bepr pdpHg'></div>"
        );
  
      if (isIframeApiloaded === 0) loadScript();
      return this.showVideo(tmpId, zoomImageLoad);
    } else {
      return this.showImage(tmpId, zoomImageLoad);
    }
  };
  ReqImage.prototype.defaultEvents = function () {
    this.handleUI();
  };
  ReqImage.prototype.showImage = function (tmpId, zoomImageLoad) {
    if (this.funcToCall.toLowerCase() === "enq") {
      if (this.displayImage !== "") {
        if (
          isSet(ReqObj.Form[tmpId].multipleImageVideo) &&
          ReqObj.Form[tmpId].multipleImageVideo !== ""
        ) {
          this.html += this.getImage(
            "t" + tmpId + "_dispimage",
            "igTh",
            this.displayImage
          );
        } else {
          this.html += this.getImage(
            "t" + tmpId + "_dispimage",
            "",
            this.displayImage
          );
        }
        if (isSet(zoomImageLoad) && zoomImageLoad === true) {
          this.html +=
            this.zoomImage !== ""
              ? this.getImage("t" + tmpId + "_zoomimage", "", this.zoomImage)
              : "";
        }
      } else if (this.zoomImage !== "") {
        this.html += this.getImage(
          "t" + tmpId + "_zoomimage",
          "",
          this.zoomImage
        );
      } else {
        return getDefaultImage(tmpId);
      }
  
      //if (isSet(zoomImageLoad) && zoomImageLoad === true) this.html += "<span class='be-blrEnqimg'  style='background-image: url(" + this.src + ");'></span>";
    }
    if (this.funcToCall.toLowerCase() === "bl" || IsChatbl(tmpId)) {
      if (this.displayImage !== "") {
        this.html += this.getImage(
          "t" + tmpId + "_dispimage",
          "",
          this.displayImage
        );
      } else {
        return getDefaultImage(tmpId);
      }
      this.html +=
        "<span class='be-blrprdimg'  style='background-image: url(" +
        this.src +
        ");'></span>";
    }
  
    return this.html;
  };
  
  ReqImage.prototype.getImage = function (id, cls, src) {
    this.src = src;
    return "<img id='" + id + "' class='" + cls + "'  src='" + src + "'" + "/>";
  };
  ReqImage.prototype.showVideo = function (tmpId) {
    var that = this;
    if (
      isSet(ReqObj.Form[tmpId].multipleImageVideo) &&
      ReqObj.Form[tmpId].multipleImageVideo !== ""
    ) {
      that.html += '<span class="eqytubg"><i class="eqytub eqpsimg"></i></span>';
      that.html += that.getImage(
        "t" + tmpId + "_dispimage",
        "igTh",
        that.displayImage
      );
      return that.html;
    } else {
      if (that.vidUrl !== "undefined" && that.vidUrl !== "") {
        youtubeVideo({
          data: {
            tmpId: tmpId,
            vidUrl: that.vidUrl,
          },
        });
      } else {
        return that.showImage(tmpId);
      }
    }
  };
  
  function getYTVideo(VideObj) {
    if (
      YT.loading === 1 &&
      YT.loaded === 1 &&
      !(
        isSet($("#t" + VideObj.data.tmpId + "_prodVideo")[0].src) &&
        $("#t" + VideObj.data.tmpId + "_prodVideo")[0].src !== ""
      )
    ) {
      isIframeApiloaded = 2;
      new_player = new YT.Player("t" + VideObj.data.tmpId + "_prodVideo", {
        width: "500",
        height: "500",
        playerVars: {
          rel: 0,
          autoplay: 1,
        },
        videoId: VideObj.data.vidUrl,
        events: {
          onReady: function (event) {
            removeYTLoader(VideObj.data.tmpId);
            $("#t" + VideObj.data.tmpId + "parent_iframe").removeClass("cbl_vh");
          },
          onStateChange: function (event) {
            $("#t" + VideObj.data.tmpId + "_imglodr").addClass("bedsnone");
  
            if (
              isSet(new_player) &&
              typeof new_player.getPlayerState === "function" &&
              new_player.getPlayerState() === 0
            ) {
              new_player.seekTo(0);
              new_player.stopVideo();
            }
          },
        },
      });
      $("#t" + VideObj.data.tmpId + "parent_iframe")
        .removeClass("bedsnone")
        .addClass("cbl_vh");
      $("#t" + VideObj.data.tmpId + "_prodimg").addClass("bedsnone");
      // if(!pdpenqImage(VideObj.data.tmpId))ReqObj.Form[VideObj.data.tmpId].videoLoaded = true;
    }
  }
  
  function youtubeVideo(VideObj) {
    addYTLoader(VideObj.data["tmpId"], "left");
  
    if (typeof YT === "undefined" && isIframeApiloaded === 0) {
      loadScript();
      window.onYouTubeIframeAPIReady = function () {
        youtubeVideo(VideObj);
      };
    } else if (
      (typeof YT === "undefined" && isIframeApiloaded === 1) ||
      (YT.loading === 1 && YT.loaded === 0) ||
      isIframeApiloaded === 0
    ) {
      loadScript();
      window.onYouTubeIframeAPIReady = function () {
        youtubeVideo(VideObj);
      };
    } else if (YT.loading === 1 && YT.loaded === 1) {
      isIframeApiloaded = 2;
      getYTVideo(VideObj);
    }
  }
  
  /* Class End Here */
  
  
  function CreateSeq(NewObjConf) {
    if (isSet(NewObjConf)) {
      ReplaceObject(NewObjConf.object, NewObjConf.tmpId, NewObjConf.that);
      if (typeof NewObjConf.object.obj.hasHtml === "function")
        NewObjConf.object.obj.hasHtml(NewObjConf);
    }
  }
  
  function getFormIdMisc(element, tmpId) {
    var array2 = ["requirementdtl", "isq"];
    if (imeshExist() === "") array2 = ["userlogin", "contactdetail"];
  
    if ($.inArray(element, array2) !== -1) return "t" + tmpId + "_partition2";
    else return "t" + tmpId + "_partition1";
  }
  
  function RenderHtmlMisc(array, tmpId, htmlArray, counter) {
    var FormIdSel = $("#t" + tmpId + "_partition1");
    RenderHtml(FormIdSel, htmlArray[0], tmpId, counter);
    FormIdSel = $("#t" + tmpId + "_partition2");
    RenderHtml(FormIdSel, htmlArray[1], tmpId, counter);
  }
  
  function RenderHtml(FormIdSel, HtmlArray, tmpId, screenNumber) {
    if (!isSet(HtmlArray)) HtmlArray = [];
    var DisplayHtml = "";
    for (var u = 0; u < HtmlArray.length; ++u) {
      for (var i = 0; i < HtmlArray[u].length; i++) {
        DisplayHtml += HtmlArray[u][i];
      }
    }
    if (DisplayHtml !== "") {
      var html = "";
      if (IsPrevBtnImplemented(tmpId)) {
        html += "<div id='" + CounterScreenId(tmpId, 0).elid + "'>";
        html += DisplayHtml;
        html += "</div>";
      } else {
        html += DisplayHtml;
      }
      isBlInline(tmpId) ? FormIdSel.html(html) : FormIdSel.append(html);
    }
    if (
      pdpInactiveBL(tmpId) &&
      ReqObj.Form[tmpId].FormSequence._screenCounter === 1
    ) {
      if (
        document.getElementById("t0901_contactinfo1") &&
        currentISO() !== "IN"
      ) {
        $("#t0901_contactinfo1").remove();
        $("#name_email").append(ReqObj.Form[tmpId].ContactDetail["1"]);
        $("#name_email").addClass("NameEmail");
        $("#name_email").css({
          width: "600px",
        });
      }
    }
  }
  
  function ShowUserAns(tmpId) {
    if (isSet(tmpId)) {
      removeBLLoader(tmpId, "center");
      var array = [];
      var that = ReqObj.Form[tmpId].FormSequence;
      if (that.OnCloseCounter > -1) {
        if (that.OnCloseCounter > 0)
          array = ReqObj.Form[tmpId].OnCloseArray[that.OnCloseCounter - 1];
        else array = [];
      } else {
        if (that.StepCounter > 0)
          array = ReqObj.Form[tmpId].UiArray[that.StepCounter - 1];
        else array = [];
      }
      for (var i = 0; i < array.length; i++) {
        if (isSet(array[i].Obj)) {
          var FormId = IsChatbl(tmpId)
            ? "#t" + tmpId + "_new_chatbl"
            : "#t" + tmpId + "_bl_form";
          var IdToHide = "";
          if (isSet(array[i].Obj.idToAppend) && array[i].Obj.idToAppend !== "") {
            FormId = array[i].Obj.idToAppend;
          }
          if (isSet(array[i].Obj.idToHide) && array[i].Obj.idToHide !== "") {
            IdToHide = array[i].Obj.idToHide;
          }
          // console.log(array[i].Obj.idToAppend);
          if (typeof array[i].Obj.displayAnswer === "function") {
            // removeBLLoader(tmpId, "center");
            var FormIdSel = $(FormId);
            var HtmlArray = array[i].Obj.displayAnswer(tmpId);
            RenderHtml(FormIdSel, HtmlArray, tmpId);
            // FormIdSel
            //   .append(array[i].Obj.displayAnswer(tmpId));
            if (FormIdSel.hasClass("bedsnone")) {
              FormIdSel.removeClass("bedsnone");
            }
            if (isSet(IdToHide) && IdToHide !== "")
              $(IdToHide).css({
                display: "none",
              });
          }
        }
      }
    }
  }
  
  function questionTransition(formType, tmpId) {
    if (
      isSet(formType) &&
      $.inArray(formType.toLowerCase(), showElemonForm) === -1
    ) {
      if (IsPrevBtnImplemented(tmpId)) {
        $($("#t" + tmpId + "_bl_form").children()).each(function () {
          $(this).css("display", "none");
        });
      } else {
        if (!isSSB(tmpId) && !isBlInline(tmpId))
          $("#t" + tmpId + "_bl_form").html("");
      }
    } else if (
      isSet(formType) &&
      $.inArray(formType.toLowerCase(), showElemonForm) !== -1
    ) {
      $(".t" + tmpId + "_userInput").each(function () {
        $(this).remove();
        chatblHideTransition(tmpId);
      });
      if (!ReqObj.Form[tmpId].NotSure) ShowUserAns(tmpId);
      else {
        var classtotest = chatBlClass(tmpId, "right");
        var leftright = IsChatbl(tmpId) ? "message-right1" : "";
        $("#t" + tmpId + "_bl_form").append(
          ConversationRightWrapper(tmpId, NotFilled, {
            classtotest: classtotest,
            leftright: leftright,
          })
        );
      }
    }
  }
  
  function IsPrevBtnImplemented(tmpId) {
    if (notEmpty(tmpId)) {
      var tmpIdArr = ["09"];
      var tmpId = tmpId.substring(0, 2);
      if ($.inArray(tmpId, tmpIdArr) !== -1) return true;
      return false;
    }
    return false;
  }
  
  function makeFinalSeq(AttachingObj, tmpId) {
    if (
      isSet(AttachingObj) &&
      isSet(AttachingObj.that) &&
      isSet(AttachingObj.that.FullServiceArray) &&
      isSet(ReqObj.Form[tmpId].UiArray)
    ) {
      AttachingObj.that.FullServiceArray.push(
        AttachingObj.object.array.ServiceArray
      );
      ReqObj.Form[tmpId].UiArray.push(AttachingObj.object.array.UiArray);
      AttachingObj.that.getStep(tmpId);
    }
  }
  
  function formatServices(arr, tmpId) {
    if ( isSet(ReqObj.Form[tmpId].ServiceSequence) && isSet(ReqObj.Form[tmpId].HitArray) && isSet(arr)) {
      for (var i = 0; i < arr.length; i++) {
        var parent = findParent(ConstructorName(arr[i].fn));
        parent = isSet(parent) ? parent : [];
        var ObjAttached = false;
        if (parent.length > 0) {
          for (var j = 0; j < parent.length; j++) {
            if ( FindCorrectSpot( ReqObj.Form[tmpId].ServiceSequence, arr[i], parent[j] )) {
              ObjAttached = true;
            } else if (
              FindCorrectSpot(ReqObj.Form[tmpId].HitArray, arr[i], parent[j])
            ) {
              ObjAttached = true;
            } else if (j === parent.length - 1 && !ObjAttached)
              ReqObj.Form[tmpId].ServiceSequence.push(arr[i]);
          }
        } else {
          ReqObj.Form[tmpId].ServiceSequence.push(arr[i]);
        }
      }
    }
  }
  
  function ServiceSequenceHit(tmpId, showLoader) {
    if ( isSet(tmpId) && isSet(ReqObj.Form[tmpId]) && isSet(ReqObj.Form[tmpId].ServiceSequence)) {
      if (isSet(showLoader) && showLoader) IsChatbl(tmpId) && ReqObj.Form[tmpId].currentScreen.toLowerCase() === "userverification" ? ReqObj.Form[tmpId].isSkipOTPClicked ? "" : $("#t" + tmpId + "cbl_msg").parent().removeClass("dn") : addBlLoader(tmpId, "right");
  
      while (ReqObj.Form[tmpId].ServiceSequence.length > 0) {
        if ( isSet(ReqObj.Form[tmpId].ServiceSequence[0]) && isSet(ReqObj.Form[tmpId].ServiceSequence[0].fn) && typeof ReqObj.Form[tmpId].ServiceSequence[0].fn.onSubmit === "function")
          ReqObj.Form[tmpId].ServiceSequence[0].fn.onSubmit(tmpId);
        else {
          if (IsProduction()) {
            ReqObj.Form[tmpId].ServiceSequence.pop();
          } else if (IsProduction()) console.err("something is wrong");
        }
      }
    }
  }
  
  function ServiceSeqGeneration(tmpId) {
    if ( isSet(tmpId) && isSet(ReqObj.Form[tmpId]) && isSet(ReqObj.Form[tmpId].ServiceSequence)) {
      while (ReqObj.Form[tmpId].ServiceSequence.length > 0) {
        if ( isSet(ReqObj.Form[tmpId].ServiceSequence[0]) && isSet(ReqObj.Form[tmpId].ServiceSequence[0].fn) && typeof ReqObj.Form[tmpId].ServiceSequence[0].fn.onSubmit === "function" && isSet(ConstructorName(ReqObj.Form[tmpId].ServiceSequence[0].fn)) && ConstructorName( ReqObj.Form[tmpId].ServiceSequence[0].fn ).toLowerCase() === "generation")
          ReqObj.Form[tmpId].ServiceSequence[0].fn.onSubmit(tmpId);
        else {
          ReqObj.Form[tmpId].ServiceSequence.pop();
        }
      }
    }
  }
  
  function subsequentKeyUI(tmpId) {
    var imeshcookie = imeshExist();
    ReqObj.Form[tmpId].flags["IsFirstStep"] = false;
    ReqObj.Form[tmpId].isQuantIsq = false;
    sectionInitialisationStepWise(tmpId, 1);
    if (!pdpenqImage(tmpId))
      new LeftSide(tmpId, ReqObj.Form[tmpId].typeofform, 1);
    if ( ReqObj.Form[tmpId].ctaType.toLowerCase() !== "image" && ReqObj.Form[tmpId].ctaType.toLowerCase() !== "video" && ReqObj.Form[tmpId].formType.toLowerCase() === "enq" && imeshcookie !== "" && !pdpInactiveBL(tmpId)) {
      $("#t" + tmpId + "_leftR").removeClass("lftMgn");
      if (currentISO() !== "IN") $("#t" + tmpId + "_thankDiv").addClass("fnUser");
    }
    if ( ReqObj.Form[tmpId].ctaType.toLowerCase() !== "image" && ReqObj.Form[tmpId].ctaType.toLowerCase() !== "video" && ReqObj.Form[tmpId].formType.toLowerCase() === "enq" && imeshcookie === "")
      $("#t" + tmpId + "_leftR").addClass("lftMgn");
    else if (!pdpInactiveBL(tmpId))
      $("#t" + tmpId + "_leftR").removeClass("lftMgn");
    if (ReqObj.Form[tmpId].formType.toLowerCase() === "bl") {
      ReqObj.updateImage = 0;
      leftSideTransition(1, tmpId);
    }
    if (parseInt(ReqObj.Form[tmpId].disableRd) === 1) {
      ReqObj.Form[tmpId].flags.isDescDivShown = !ReqObj.Form[tmpId].flags.isDescDivShown;
    }
    $("#t" + tmpId + "_byrinfo").html(get_buyer_info(tmpId)).removeClass("bedsnone");
    $("#t" + tmpId + "_hdg").removeClass("bedsnone");
    $("#t" + tmpId + "_login").addClass("bedsnone");
  }
  
  //Term n condition
  
  function termNcdata(tmpId) {
    var iploc = usercookie.getCookie("iploc");
    var data = {};
    data["s_glusrid"] = usercookie.getParameterValue(imeshExist(), "glid");
    data["modid"] = ReqObj.Form[tmpId].modId;
    data["s_user_agent"] = navigator.userAgent;
    data["s_ip"] = usercookie.getParameterValue(iploc, "gip");
    data["s_ip_country"] = usercookie.getParameterValue(iploc, "gcnnm");
    data["curr_page_url"] = window.location.href;
    data["reference_text"] = ReqObj.Form[tmpId].refText;
    data["s_ip_country_iso"] = usercookie.getParameterValue(iploc, "gcniso");
    if (
      isSet(data["s_ip"]) &&
      data["s_ip"] !== "" &&
      isSet(data["s_glusrid"]) &&
      data["s_glusrid"] !== "" &&
      isSet(data["s_user_agent"]) &&
      data["s_user_agent"] !== "" &&
      isSet(data["modid"]) &&
      data["modid"] !== "" &&
      isSet(data["s_ip_country_iso"]) &&
      data["s_ip_country_iso"] !== "IN"
    )
      fireAjaxRequest({
        data: {
          ga: {
            s: true,
            f: true,
            gatype: "TermNCondition",
            source: "",
          },
          tmpId: tmpId,
          ajaxObj: {
            obj: "",
            s: {
              ss: 0,
              sf: {
                af: 0,
                pa: 0,
              },
              f: 0,
            },
            f: {
              f: 0,
            },
          },
          ajaxdata: data,
          ajaxtimeout: 0,
          type: 4,
          hitfinserv: "",
        },
      });
  }
  
  if (typeof blpage === "undefined" || blpage === null) {
    var blpage = {};
    blpage.toIdentifiedQ = new Array();
    blpage.toIdentified = function () {
      if (isSet(blpage.toIdentifiedQ)) {
        for (var j = 0; j < blpage.toIdentifiedQ.length; j++) {
          if (
            isSet(blpage.toIdentifiedQ[j]) &&
            typeof blpage.toIdentifiedQ[j] === "function"
          )
            blpage.toIdentifiedQ[j].apply();
        }
      }
    };
  }
  
  function UpdateSeq(tmpId, where) {
    for (var key in ReqObj.Form) {
      if (key !== tmpId) {
        formToUpdate(key, where);
      }
    }
  }
  
  function formToUpdate(key, flagsugg) {
    if (IsChatbl(key)) {
      if (IsChatBLInline(key)) ReqObj.Form[key].fromUpdate = true;
      UpdateCurrentStep(key, flagsugg);
    } else {
      if (flagsugg == "changeflag" && isSSB(key))
        ReqObj.Original[key]["loginv"] = ReqObj.Form[key]["savevalue"];
      CallFormFunc(key, flagsugg);
    }
  }
  
  function CallFormFunc(key, flagsugg) {
    if (isSSB(key) && !isnewSSB(key) && !ReqObj.Form[key].flags.toCallUpdateSeq) {
      return;
    } else if (isGlIdEven(key) && key.substr(0, 2) === "01") {
      OpenForm(ReqObj.Form[key], flagsugg);
    } else if (IsChatbl(key)) {
      OpenForm(ReqObj.Original[key], flagsugg);
    } else if ($.inArray(key.substring(0, 2), BlPopup) === -1) {
      if (Bl04(key)) OpenForm(ReqObj.Form[key], flagsugg);
      else OpenForm(ReqObj.Original[key], flagsugg);
    } else if ($.inArray(key.substring(0, 2), EnqPopup) === -1) {
      OpenForm(ReqObj.Original[key], flagsugg);
    }
  }
  
  function callToIdentifiedQ(tmpId, fromwhere, update) {
    // if (typeof fromwhere === "undefined") {
    //   update = 1; // to update from header
    // }
    if (typeof fromwhere === "undefined") {
      // which means login from header
      UpdateUserDetailKey();
      ReqObj.CNSerCalled = false;
    }
    if (update !== 0) UpdateSeq(tmpId, fromwhere);
    if (isSet(blpage)) {
      if (isSet(blpage.toIdentified)) {
        if (typeof blpage.toIdentified === "function") blpage.toIdentified();
      }
    } else if (isSet(window.parent.blpage)) {
      if (isSet(window.parent.blpage.toIdentified)) {
        if (typeof window.parent.blpage.toIdentified === "function")
          window.parent.blpage.toIdentified();
      }
    }
    if (typeof page !== "undefined") {
      if (isSet(page.Identified)) {
        if (typeof page.Identified === "function") page.Identified();
      }
    } else if (isSet(window.parent.page)) {
      if (isSet(window.parent.page.Identified)) {
        if (typeof window.parent.page.Identified === "function")
          window.parent.page.Identified();
      }
    }
  }
  
  function ResetClass(ClassRemoved, tmpId) {
    if (isSet(ClassRemoved)) {
      for (var i = 0; i < ClassRemoved.length; i++) {
        if (isSet(ClassRemoved[i].Obj)) {
          if (typeof ClassRemoved[i].Obj.resetClass === "function") {
            ClassRemoved[i].Obj.resetClass(tmpId);
          }
        }
      }
    }
  }
  
  function UpdateCurrentStep(tmpId, flagsugg) {
    if (isSet(tmpId)) {
      ShowHideTNC(tmpId);
      var that = ReqObj.Form[tmpId].FormSequence;
      if (that.OnCloseCounter > -1) {
        that.OnCloseCounter -= 1;
        var serviceSplittedArray = that.OnCloseServiceArray.splice(
          that.OnCloseCounter,
          1
        );
        ReqObj.Form[tmpId].OnCloseArray =
          ReqObj.Form[tmpId].OnCloseArray[this.OnCloseCounter];
      } else {
        var ClassRemoved = ReqObj.Form[tmpId].UiArray[that.StepCounter];
        if (BlReloadRequired(ClassRemoved, tmpId)) {
          if (RemoveLastQuestion(tmpId)) {
            ReqObj.Form[tmpId].PrevAnsPrint = false;
            ResetClass(ClassRemoved, tmpId);
            var serviceSplittedArray = that.FullServiceArray.splice(
              that.StepCounter,
              1
            )[0];
            Getprepost(serviceSplittedArray, tmpId);
  
            //if generating generation id if user signs in from some other place
            //SubmitCallback(serviceSplittedArray, tmpId);
            //
  
            var count = that.StepCounter;
            that.StepCounter -= 1;
            if (that.StepCounter > -1) {
              ReqObj.Form[tmpId].UiArray.splice(count, 1);
            } else {
              ReqObj.Form[tmpId].UiArray = [];
            }
            if (
              isSet(ReqObj.Form[tmpId].LastPrePost) &&
              ReqObj.Form[tmpId].LastPrePost instanceof Array
            ) {
              for (var t = 0; t < ReqObj.Form[tmpId].LastPrePost.length; ++t) {
                PrePostService(ReqObj.Form[tmpId].LastPrePost[t], tmpId);
              }
              ReqObj.Form[tmpId].LastPrePost = [];
            }
          }
        } else if (
          flagsugg !== "changeflag" &&
          imeshExist() === "" &&
          $("#t" + tmpId + "_chatBL").hasClass("cbl_vv") &&
          $("#t" + tmpId + "_flagC").html() === ""
        ) {
          var ele = $("#t" + tmpId + "country_dropd").detach();
          $("#t" + tmpId + "country").prepend(ele);
        }
      }
    }
  }
  
  function RemoveLastQuestion(tmpId) {
    if (IsChatbl(tmpId)) {
      return RemoveLastPopupQuestion(tmpId);
    }
  }
  
  function RemoveLastInlineQuestion() {
    var lastQuestion = $(".message-left").last();
    // if (lastQuestion.length > 0 && lastQuestion.next().length > 0 && !lastQuestion.next().hasClass("message-right")) {
    if (!lastQuestion.next().hasClass("message-right")) {
      lastQuestion.remove();
      return true;
    } else return false;
  }
  
  function RemoveLastPopupQuestion(tmpId) {
    if (IsChatBLInline(tmpId)) {
      var lastQuestion = $(".cbl_ques").last();
      var questionCount = lastQuestion.siblings;
      var isStatic = $(".cbl_ques").last().attr("isStatic");
      if (
        isSet(ReqObj.closebtnclicked) &&
        ReqObj.closebtnclicked &&
        questionCount <= 2
      ) {
        ReqObj.closebtnclicked = false;
        return false;
      }
      if (!lastQuestion.next().hasClass("cbl_ansr") && isStatic !== "yes") {
        lastQuestion.remove();
        IsChatBLInline(tmpId)
          ? $("#t" + tmpId + "_newblchatReply")
              .html("")
              .addClass("cbl_br10 cbl_bgf1")
              .removeClass("cbl_bg1")
          : $("#t" + tmpId + "_newblchatReply").html("");
        removechatblerror(tmpId);
        return true;
      } else return false;
    } else return false;
  }
  
  function BlReloadRequired(ClassRemoved, tmpId) {
    if (isSet(ClassRemoved)) {
      if (ClassRemoved instanceof Array) {
        {
          for (var h = 0; h < ClassRemoved.length; ++h) {
            if (typeof ClassRemoved[h].Obj.toUpdate === "function") {
              return ClassRemoved[h].Obj.toUpdate(tmpId);
            }
          }
          return false;
        }
      } else {
        if ($.inArray(ConstructorName(ClassRemoved.Obj), ReloadReqClass) !== -1) {
          return true;
        } else return false;
      }
    }
    return false;
  }
  
  function Getprepost(serviceSplittedArray, tmpId) {
    if (isSet(serviceSplittedArray)) {
      for (var y = 0; y < serviceSplittedArray.length; ++y) {
        if (
          !isSet(ReqObj.Form[tmpId].LastPrePost) ||
          (isSet(ReqObj.Form[tmpId].LastPrePost) &&
            ReqObj.Form[tmpId].LastPrePost.length === 0)
        ) {
          var PrepostVal = CheckPrepost(serviceSplittedArray[y]);
          if (PrepostVal !== "") ReqObj.Form[tmpId].LastPrePost = PrepostVal;
        }
      }
    }
  }
  
  function CheckPrepost(CurrentRemovedClassHooks) {
    if (isSet(CurrentRemovedClassHooks)) {
      if (
        isSet(CurrentRemovedClassHooks.current) &&
        CurrentRemovedClassHooks.current.length > 0
      ) {
        return CurrentRemovedClassHooks.current;
      } else if (
        isSet(CurrentRemovedClassHooks.pre) &&
        CurrentRemovedClassHooks.pre.length > 0
      ) {
        return CurrentRemovedClassHooks.pre;
      } else if (
        isSet(CurrentRemovedClassHooks.post) &&
        CurrentRemovedClassHooks.post.length > 0
      ) {
        return CurrentRemovedClassHooks.post;
      }
      return "";
    }
    return "";
  }
  
  function UpdateUserDetailKey() {
    // Imesh must be considered when user logs in from header not Key.
    var imeshCookie = imeshExist();
    var iploc = iplocExist();
    ReqObj.UserDetail["fn"] = usercookie.getParameterValue(imeshCookie, "fn");
    ReqObj.UserDetail["em"] = usercookie.getParameterValue(imeshCookie, "em");
    ReqObj.UserDetail["mb1"] = usercookie.getParameterValue(imeshCookie, "mb1");
    ReqObj.UserDetail["ctid"] = usercookie.getParameterValue(imeshCookie, "ctid");
    ReqObj.UserDetail["uv"] = usercookie.getParameterValue(imeshCookie, "uv");
    ReqObj.UserDetail["glid"] = usercookie.getParameterValue(imeshCookie, "glid");
    ReqObj.UserDetail["statename"] = "";
    ReqObj.UserDetail["stateid"] = "";
    ReqObj.UserDetail["cityname"] = "";
    ReqObj.UserDetail["ctoth"] = "";
    ReqObj.UserDetail["suggesCity"] = {
      geoloc: [
        usercookie.getParameterValue(iploc, "lg_ct"),
        usercookie.getParameterValue(iploc, "lg_ctid"),
      ],
      hdcity: [
        usercookie.getParameterValue(usercookie.getCookie("xnHist"), "city"),
        "",
      ],
      iploc: [
        usercookie.getParameterValue(iploc, "gctnm"),
        usercookie.getParameterValue(iploc, "gctid"),
      ],
    };
  }
  
  function ModifyUserDetail(arr, todo) {
    var toret = 0;
    var len = isSet(arr) ? arr.length : -1; // js error undefined is not an object, reading e.length
    var valtoupdate = isSet(todo) && todo === "empty" ? "" : "";
    for (var i = 0; i < len; i++) {
      ReqObj.UserDetail[arr[i]] = valtoupdate;
      if (arr[i] === "ctid") toret = 1;
    }
  
    return toret;
  }
  
  function flagDropdTracking(tmpId) {
    var form_type =
      ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
    if (isSet(ReqObj.Form[tmpId].flag_track)) {
      if (ReqObj.Form[tmpId].flag_track === 1)
        blenqGATracking(form_type, "Flag|First", getEventLabel(), 1, tmpId);
      else if (ReqObj.Form[tmpId].flag_track === 2)
        blenqGATracking(form_type, "Flag|Second", getEventLabel(), 1, tmpId);
    } else blenqGATracking(form_type, "Flag|Nochange", getEventLabel(), 1, tmpId);
  }
  
  function UserVerification() {
    this.otpCount = 0;
    this.imeshCookie = "";
    this.v4iilexCookie =
      ""; /* first otp request yahi bhejdo to avoid any delays */
    this.verifyhtml = "";
    this.className = "UserVerification";
    this.UserVerificationHtmlObj = {
      Label: "",
      UserInput: "",
      OuterWrapper: "",
      ClosingWrapper: "",
    };
    this.UserVerificationHtmlObjArray = [];
    this.otp = "";
    this.message = "";
  }
  UserVerification.prototype.displayAnswer = function (tmpId) {
    if (
      !(ShowEmail() && EmailAfterReqbox(tmpId)) &&
      (ReqObj.Form[tmpId].isSkipOTPClicked === true ||
        ReqObj.Form[tmpId].showotpstep === 1)
    )
      return;
    return !IsChatbl(tmpId)
      ? [
          ConversationCenterWrapper(
            tmpId,
            "Mobile No. Verified" + "<span class='chat-tickbx1'></span>"
          ),
        ]
      : [
          ConversationCenterWrapper(
            tmpId,
            "<div class = 'txt_area cbl_brd1 cbl_clr1'><svg class='cbl_ok cbl_field'><use xlink:href='#t" +
              tmpId +
              "cblcheck'></use></svg>" +
              "Thank You for confirming your requirement" +
              "</div>"
          ),
        ];
  };
  UserVerification.prototype.SaveDetails = function (tmpId) {
    if (IsChatbl(tmpId)) ReqObj.Form[tmpId].UserInputs["OTP"] = this.otp;
  };
  
  UserVerification.prototype.toUpdate = function (tmpId) {
    if (usercookie.getParameterValue(imeshExist(), "uv") === "V") return true;
    return false;
  };
  
  UserVerification.prototype.displayHtml = function (tmpId) {
    /* common for all classes , defaultEvents() common for all. */
    if (isSet(tmpId)) {
      $("#t" + tmpId + "_byrinfo").addClass("bedsnone");
      if (!IsChatbl(tmpId)) $("#t" + tmpId + "_hdg").addClass("bedsnone");
      ReqObj.Form[tmpId].flags.isOtpShown = true;
      if (IsChatbl(tmpId)) {
        return [this.verifyhtmlLabel, this.verifyhtmlInput];
      }
      if (isOtherEnq(tmpId)) {
        ReqObj.Form[tmpId].calledClassName[
          ReqObj.Form[tmpId].FormSequence.StepCounter
        ] = this.className;
      }
      return [this.verifyhtml];
    }
  };
  
  UserVerification.prototype.EventIfScreenPresent = function (tmpId) {
    /* common for all classes , defaultEvents() common for all. */
    if (isSet(tmpId)) {
      $("#t" + tmpId + "_byrinfo").addClass("bedsnone");
      if (!IsChatbl(tmpId)) $("#t" + tmpId + "_hdg").addClass("bedsnone");
      if (isOtherEnq(tmpId)) {
        this.handleHeading(tmpId);
        ButtonNameUI("isq", tmpId);
        ButtonNameUI("userverification", tmpId);
      }
    }
  };
  
  UserVerification.prototype.handleHeading = function (tmpId) {
    if (!isSSB(tmpId) && !isBl(tmpId))
      $("#t" + tmpId + "OtpMainHeading")
        .removeClass("bedsnone")
        .html(getFormHeading(tmpId, ReqObj.Form[tmpId].currentScreen));
  };
  
  UserVerification.prototype.handleButton = function (tmpId) {
    var data = { showBackBtn: 0 };
    ButtonNameUI(ReqObj.Form[tmpId].currentScreen, tmpId, data);
  };
  
  UserVerification.prototype.addHtmlObjToArray = function (htmlObj) {
    this.UserVerificationHtmlObjArray.push(htmlObj);
  };
  
  UserVerification.prototype.hasHtml = function (UserVerificationObject) {
    if (isSet(UserVerificationObject)) {
      var tmpId = UserVerificationObject.tmpId;
  
      if (
        !isSSB(tmpId) &&
        currentISO() === "IN" &&
        !isMoglixUi(tmpId) &&
        !IsChatbl(tmpId) &&
        isSet(ReqObj.Form[tmpId].mcatId) &&
        parseInt(ReqObj.Form[tmpId].mcatId, 10) !== -1 &&
        ReqObj.Form[tmpId].mcatId != "" &&
        !isSet(sessionStorage.getItem("plaWidget-" + ReqObj.Form[tmpId].mcatId))
      ) {
        plawidget(tmpId);
      }
  
      this.message =
        isEnq(tmpId) || isBl(tmpId)
          ? UserVerificationObject.message
          : isSet(UserVerificationObject.message)
          ? UserVerificationObject.message.message
          : "";
      this.cookies();
      if (!isSSB(tmpId))
        this.sendOtp({
          data: {
            type: 1,
            x: this,
            id: "",
            resend: 0,
            tmpId: tmpId,
          },
        });
      var change_iso = currentISO();
  
      if (change_iso === "IN") this.addHtmlObjToArray(this.getOTPHtml(tmpId));
      // var UserVerificationSuffixObj = {
      //   "suffix": "_otpbox",
      //   "class": ""
      // };
      if (!IsChatbl(tmpId)) {
        var UserVerificationSuffixOuterHtml = isSSB(tmpId)
          ? otpOuterHtml(tmpId)
          : "<div  id='t" + tmpId + "_otpbox'>";
        var UserVerificationSuffixClosingHtml = "</div>";
        var UserVerificationSuffixHtmlObj = {
          SuffixOuterHtml: UserVerificationSuffixOuterHtml,
          SuffixClosingHtml: UserVerificationSuffixClosingHtml,
          suffix: "_otpbox",
        };
        this.verifyhtml =
          change_iso === "IN"
            ? MakeWrapper(
                [this.UserVerificationHtmlObjArray],
                tmpId,
                UserVerificationSuffixHtmlObj,
                ""
              )
            : "";
      } else {
        this.verifyhtmlLabel =
          change_iso === "IN"
            ? MakeWrapper(
                [this.UserVerificationHtmlObjArray],
                tmpId,
                WrapperObj(
                  "<div  id='t" + tmpId + "_otpbox' class = 'cbl_ques cbl_vh'>",
                  "</div>",
                  "_otpbox"
                ),
                "ques"
              )
            : "";
        this.verifyhtmlInput =
          change_iso === "IN"
            ? MakeWrapper(
                [this.UserVerificationHtmlObjArray],
                tmpId,
                WrapperObj(
                  "<div  id='t" +
                    tmpId +
                    "_otpbox' class ='cbl_dtls cbl_otp cbl_df cbl_aic t" +
                    tmpId +
                    "_userInput cbl_br10 dn'>",
                  "</div>",
                  "_otpbox"
                ),
                "input"
              )
            : "";
        this.verifyhtml =
          change_iso === "IN" ? this.verifyhtmlLabel + this.verifyhtmlInput : "";
      }
      UserVerificationObject.that.NumberofClassCalled -= 1;
      if (this.verifyhtml !== "") {
        AttachObject(UserVerificationObject.object, tmpId);
        if (isSet(UserVerificationObject.AfterService)) {
          for (var i = 0; i < UserVerificationObject.AfterService.length; i++) {
            UserVerificationObject.that.MakeSeq(
              UserVerificationObject.AfterService[i],
              tmpId
            );
          }
        }
        if (UserVerificationObject.that.NumberofClassCalled === 0) {
          makeFinalSeq(UserVerificationObject, tmpId);
        }
      } else {
        if (UserVerificationObject.hasFallback) {
          CreateSeq(UserVerificationObject.FallbackObj);
        }
      }
      if (this.verifyhtml !== "") return true;
      else return false;
    }
  };
  UserVerification.prototype.defaultEvents = function (tmpId) {
    $("#yajaca").hide(); // click away message on pns form
    if (isSet(tmpId)) {
      if (IsChatbl(tmpId)) ChatblfooterAns(tmpId);
      this.handleEvents(this, tmpId);
      this.handleUI(tmpId, "focus", "", "");
      if (isOtherEnq(tmpId)) {
        this.handleHeading(tmpId);
      }
    }
  };
  UserVerification.prototype.validate = function (tmpId) {
    if (isSet(tmpId)) {
      $("#verifyerrotpdiv").addClass("bedsnone");
      if ((isSSB(tmpId) || isEnq(tmpId)) && ReqObj.Form[tmpId].isSkipOTPClicked) {
        return true;
      }
      var authkey =
        $("#t" + tmpId + "bl_enqOtp1").val() +
        $("#t" + tmpId + "bl_enqOtp2").val() +
        $("#t" + tmpId + "bl_enqOtp3").val() +
        $("#t" + tmpId + "bl_enqOtp4").val();
      this.otp = authkey;
      if (
        !isOTPBoxHidden(tmpId) &&
        ((isSet(authkey) && authkey === "") || authkey.length !== 4)
      ) {
        this.handleUI(tmpId, "verificationFailed", "beforeRequest", authkey);
        return false;
      }
      return true;
    }
  };
  UserVerification.prototype.onSubmit = function (tmpId, userVerificationObj) {
    var authkey =
      $("#t" + tmpId + "bl_enqOtp1").val() +
      $("#t" + tmpId + "bl_enqOtp2").val() +
      $("#t" + tmpId + "bl_enqOtp3").val() +
      $("#t" + tmpId + "bl_enqOtp4").val();
    if (
      ReqObj.Form[tmpId].isSkipOTPClicked === true &&
      !isSSB(tmpId) &&
      !isEnq(tmpId)
    ) {
      ReqObj.Form[tmpId].ServiceSequence.pop();
      return;
    }
  
    if (
      !(checkblockedUser() && imeshExist() === "") &&
      isSSB(tmpId) &&
      toRemoveOTP(tmpId)
    )
      return;
  
    this.otp = authkey;
    if (
      (IsChatbl(tmpId) && this.message !== "second") ||
      (isSet(authkey) && authkey.length === 4) ||
      (ReqObj.Form[tmpId].isSkipOTPClicked === true &&
        (isSSB(tmpId) || isEnq(tmpId)))
    ) {
      if (
        (isSet(authkey) && authkey.length === 4) ||
        (ReqObj.Form[tmpId].isSkipOTPClicked === true &&
          (isSSB(tmpId) || isEnq(tmpId)))
      ) {
        var verifyObject = new PreAjax("UserVerification", tmpId);
        this.validateOtp({
          data: {
            type: 2,
            userVerificationObject: this,
            obj: verifyObject,
            authKey: authkey,
            tmpId: tmpId,
          },
        });
      }
    }
  };
  UserVerification.prototype.cookies = function () {
    this.imeshCookie = imeshExist();
    this.v4iilexCookie = usercookie.getCookie("v4iilex");
  };
  UserVerification.prototype.returnOTPInputs = function (formType, tmpId) {
    var inputclass = IsChatbl(tmpId) || isSSB(tmpId) ? "" : "bloptin";
    var otphtml = "";
    otphtml += returnInput(
      "t" + tmpId,
      "bl_enqOtp1",
      "text",
      "",
      "",
      inputclass,
      "",
      "",
      "1"
    );
    otphtml += returnInput(
      "t" + tmpId,
      "bl_enqOtp2",
      "text",
      "",
      "",
      inputclass,
      "",
      "",
      "1"
    );
    otphtml += returnInput(
      "t" + tmpId,
      "bl_enqOtp3",
      "text",
      "",
      "",
      inputclass,
      "",
      "",
      "1"
    );
    otphtml += returnInput(
      "t" + tmpId,
      "bl_enqOtp4",
      "text",
      "",
      "",
      inputclass,
      "",
      "",
      "1"
    );
  
    return otphtml;
  };
  UserVerification.prototype.returnErrorDiv = function (tmpId, errorclass) {
    var otphtml = "";
    otphtml += returnContainer(
      "t" + tmpId,
      "verifyerrotpdiv",
      errorclass,
      "",
      ""
    );
    otphtml += returnSpan("t" + tmpId, "verify_err", "", "");
    otphtml += "</div>";
    return otphtml;
  };
  UserVerification.prototype.getOTPInput = function (tmpId, formType) {
    var that = this;
    var otphtml = "";
    if (IsChatbl(tmpId)) {
      otphtml += returnContainer("", "", "cbl_otpgrp cbl_w1", "", "");
      otphtml +=
        "<label>Enter One Time Password</label>" +
        that.returnOTPInputs(formType, tmpId) +
        "</div>";
      var otpclass = "bltperor bedsnone betxtc";
      otphtml += that.returnErrorDiv(tmpId, otpclass);
      var classtosend = "cbl_brd1 cbl_clr1 cbl_cp";
      otphtml += returnContainer("", "", "cbl_resend ", "", "");
      if (
        !ReqObj.Form[tmpId].isotpSkipped &&
        this.message.toLowerCase() !== "second" &&
        !checkblockedUser()
      ) {
        ReqObj.Form[tmpId].isotpSkipped = true;
        otphtml += returnButton("t" + tmpId, "_skipOTP", "Skip", classtosend);
      }
      classtosend += IsChatBLInline(tmpId) ? " rsndOtp cbl_pa" : "";
      otphtml += returnButton(
        "t" + tmpId,
        "resendOtp",
        "Resend OTP",
        classtosend
      );
      otphtml += "</div>";
    } else {
      //ReqObj.UserDetail["blusrdtl"] = {"blkUsr" : 1, "blk_mb" : event.data.obj.username, "blk_iso": "91"};
      var imeshcookie = imeshExist();
      var PhoneNumber =
        checkblockedUser() && im_issExist() === ""
          ? "+" +
            ReqObj.UserDetail.blusrdtl.blk_iso +
            "-" +
            ReqObj.UserDetail.blusrdtl.blk_mb
          : "+" +
            usercookie.getParameterValue(imeshcookie, "phcc") +
            "-" +
            usercookie.getParameterValue(imeshcookie, "mb1");
      if (isSSB(tmpId))
        otphtml = OTPuserInput(tmpId, formType, that, PhoneNumber);
      else {
        otphtml += returnContainer("", "", "m15 blml20 bepr beopt", "", "");
        if (!isOtherEnq(tmpId))
          otphtml += '<i class="blnewform_sprit blicotp beflt"></i>';
        if (isOtherEnq(tmpId))
          otphtml += returnContainer("", "", "bedblk  bevT", "", "");
        else
          otphtml += returnContainer("", "", "bedblk bemt15 beml10 bevT", "", "");
        otphtml += that.returnOTPInputs(formType, tmpId);
        var cls = isMoglixUi(tmpId) ? "btpErr bedsnone" : "bltperor bedsnone";
        otphtml += that.returnErrorDiv(tmpId, cls);
        // if (isOtherEnq(tmpId)) { otphtml += returnContainer("t" + tmpId, "_helpmsg", "eqOtphlp", "", "Sent to mobile " + returnSpan("t" + tmpId, "_phone", PhoneNumber, "", "") + " via " + returnSpan("t" + tmpId, "_sms", "SMS", "", ""), ""); otphtml += "</div>"; }
        otphtml += '</div ></div ><div class="beclr"></div>';
        otphtml = isOtherEnq(tmpId)
          ? otphtml + '<div class="beotpSW betxtc">Did not receive  OTP?'
          : otphtml + '<div class="beotpSW betxtc">Did not receive  OTP? ';
        var clsin = Enq04(tmpId) || isBl(tmpId) ? "beml10" : "";
        otphtml += returnButton(
          "t" + tmpId,
          "resendOtp",
          "Resend",
          "blSmst " + clsin
        );
        if (toAddSkipOtp(tmpId, this.message)) {
          otphtml += returnButton(
            "t" + tmpId,
            "_skipOTP",
            "Skip",
            clsin,
            "top: -98px;background-color: transparent;border: none;color: #999;cursor:pointer"
          );
        }
        var cls = isMoglixUi(tmpId)
          ? "blgrcl1 disp-inl f_bold cbl_vh dn"
          : "blgrcl1 disp-inl f_bold cbl_vh";
        otphtml += returnSpan("", "", "", cls);
        //otphtml += returnButton("t" + tmpId, "bl_enqMisscall", "Get OTP on Call", "blSmst");
        otphtml +=
          '</div><div class="blLdot blMt25 relt beotpSW" style="display: none"><span class="blgrcl disp - inl f_bold">OR</span></div> <div class="bloptS beotpSW" style="display: none"><span class="blotp">Give us a missed call on : <strong class="blMsN">098-9981-0984</strong></span></div></div >';
      }
    }
    that.UserVerificationHtmlObj["UserInput"] = otphtml;
  };
  
  UserVerification.prototype.getOTPLabel = function (tmpId, formType) {
    var that = this;
    var otphtml = "";
    var imeshcookie = imeshExist();
    var PhoneNumber = checkblockedUser()
      ? "+" +
        ReqObj.UserDetail.blusrdtl.blk_iso +
        "-" +
        ReqObj.UserDetail.blusrdtl.blk_mb
      : "+" +
        usercookie.getParameterValue(imeshcookie, "phcc") +
        "-" +
        usercookie.getParameterValue(imeshcookie, "mb1");
    if (IsChatbl(tmpId)) {
      if (this.message === "second") {
        otphtml +=
          "To post your requirement, please enter the One Time Password (OTP) sent on your mobile ";
        otphtml += returnSpan("", "", PhoneNumber, "befwt");
      } else {
        otphtml += "Enter the One Time Password (OTP) sent on  your mobile ";
        otphtml += returnSpan("", "", PhoneNumber, "befwt");
        otphtml += " to ";
        otphtml += returnSpan("", "", "confirm", "befwt");
        otphtml += " your requirement";
      }
    } else {
      var otpMsg = isBl(tmpId)
        ? "Verify your mobile number to receive quotes"
        : "Confirm your requirement";
      var cls = isMoglixUi(tmpId) ? "e_hdg" : "otphdg";
      var otphed = returnContainer(
        "t" + tmpId,
        "OtpMainHeading",
        cls,
        "",
        otpMsg
      );
      otphed += "</div>";
      if (isMoglixUi(tmpId) && $("#t" + tmpId + "OtpMainHeading").length == 0) {
        $("#t" + tmpId + "_leftS").before(otphed);
      } else if (!isMoglixUi(tmpId)) {
        otphtml += otphed;
      }
      otphtml += returnContainer(
        "",
        "",
        "befs16 blotp bemb20",
        "",
        "Enter the 4 digit One Time Password (OTP) sent to your Mobile Number "
      );
      otphtml +=
        returnSpan("", "", PhoneNumber, "disp-inl befwt", "") + "</span>";
      otphtml += " via SMS</div>";
    }
    that.UserVerificationHtmlObj["Label"] = otphtml;
  };
  
  UserVerification.prototype.getOTPHtml = function (tmpId) {
    var that = this;
    var formType = ReqObj.Form[tmpId].formType.toLowerCase();
  
    if (!isSSB(tmpId)) that.getOTPLabel(tmpId, formType);
    that.getOTPInput(tmpId, formType);
    that.UserVerificationHtmlObj["OuterWrapper"] = "";
    that.UserVerificationHtmlObj["ClosingWrapper"] = "";
  
    return that.UserVerificationHtmlObj;
  };
  UserVerification.prototype.sendOtp = function (event) {
    var type = event.data.type;
    var that = event.data.x;
    var id = event.data.id;
    var resend = event.data.resend;
    var tmpId = event.data.tmpId;
    var form_type =
      ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
    if (
      isSSB(tmpId) &&
      ReqObj.Form[tmpId].isEnterclicked &&
      id.toLowerCase() === "resendotp"
    ) {
      ReqObj.Form[tmpId].isEnterclicked = false;
      return "";
    }
    if (ReqObj.Form[tmpId].OnCloseStep && isSet(ReqObj.Form[tmpId].FormSequence))
      var StepNumber =
        ReqObj.Form[tmpId].FormSequence.StepCounter +
        1 +
        ReqObj.Form[tmpId].FormSequence.OnCloseCounter +
        1;
    else var StepNumber = ReqObj.Form[tmpId].FormSequence.StepCounter + 1;
  
    if (resend === 1 && id === "resendOtp")
      blenqGATracking(form_type,"resendOTP|" + StepNumber + "|UserVerification",getEventLabel(),0,tmpId);
    else if (resend === 0 && id === "bl_enqMisscall")
      blenqGATracking(form_type,"OncallOTP|" + StepNumber + "|UserVerification",getEventLabel(),0,tmpId);
    // if(resend === 0){
    //   if(isSet(that.afterGen) && that.afterGen === true)
    //     blenqGATracking(form_type, 'OTP2Shown', getEventLabel(), 1, tmpId);
    //   else if(Enq09(tmpId))
    //     blenqGATracking(form_type, 'OTP1Shown', getEventLabel(), 1, tmpId);
    // }
  
    that.handleUI(tmpId, "refresh", "", "");
  
    if (that.otpCount === 3) {
      /* only 2 times */
      that.handleUI(tmpId, "otpCount3", "", "");
      return;
    } else if (
      that.otpCount > 0 &&
      that.otpCount <= 3 &&
      ReqObj["OTPratelimitstatus"] !== "Access Denied"
    ) {
      that.handleUI(tmpId, "otpCount123", "", "");
    }
  
    var data =
      type === 3
        ? that.getData(3, resend, tmpId, "")
        : type === 1
        ? that.getData(1, resend, tmpId, "")
        : "";
    if (data !== "") that.sendRequest(ObjectTrim(data), type, "", that, tmpId);
  };
  UserVerification.prototype.validateOtp = function (event) {
    //
    var type = event.data.type;
    var that = event.data.userVerificationObject;
    var tmpId = event.data.tmpId;
    var verifyObject = event.data.obj;
    var authkey = event.data.authKey;
    that.sendRequest(
      ObjectTrim(that.getData(2, "", tmpId, authkey)),
      type,
      verifyObject,
      that,
      tmpId
    );
  };
  UserVerification.prototype.getData = function (flag, resend, tmpId, authkey) {
    var data = {
      s_mobile: usercookie.getParameterValue(this.imeshCookie, "mb1"),
      modid: ReqObj.Form[tmpId].modId,
      s_country_code: usercookie.getParameterValue(this.imeshCookie, "phcc"),
      s_country_iso: usercookie.getParameterValue(this.imeshCookie, "iso"),
      s_glusrid: usercookie.getParameterValue(this.imeshCookie, "glid"),
      flag: ReqObj.Form[tmpId].formType.toLowerCase(),
      OTPResend: resend,
      verify_screen: isSSB(tmpId) ? "ssb" : "default",
    };
    if (flag === 1) {
      /* for OTP sending*/ data["todoflag"] = "OTPGen";
      return data;
    } else if (flag === 2) {
      /* for OTP Validation */ data["todoflag"] = "OTPVer";
      data["s_authkey"] = authkey;
      return data;
    } else if (flag === 3) {
      /*for OTP through call */
      data["todoflag"] = "OTPGen";
      data["misscall"] = 1;
      return data;
    }
  };
  
  UserVerification.prototype.getAjaxData = function (data) {
    var _case = checkblockedUser() && im_issExist() === "" ? 2 : 1;
    var ajaxData = {
      token: "imobile@15061981",
      mobile_num:
        _case === 2
          ? ReturnCorrectVal(ReqObj.UserDetail["blusrdtl"]["blk_mb"], "")
          : ReturnCorrectVal(data["s_mobile"], ""),
      modid: ReturnCorrectVal(data["modid"], "DIR"),
      user_mobile_country_code:
        _case === 2
          ? ReturnCorrectVal(ReqObj.UserDetail["blusrdtl"]["blk_iso"], "91")
          : ReturnCorrectVal(data["s_country_code"], "91"),
      flag: ReturnCorrectVal(data["todoflag"], "OTPGen"),
      user_ip: ReturnCorrectVal(
        usercookie.getParameterValue(usercookie.getCookie("iploc"), "gip"),
        ReqObj.IPDetails["ipaddress"]
      ),
      user_country:
        _case === 2
          ? currentISO()
          : ReturnCorrectVal(
              data["s_country_iso"],
              ReqObj.IPDetails["countryiso"]
            ),
      glusrid:
        _case === 2 && isSet(ReqObj.UserDetail.blusrdtl.glid)
          ? ReturnCorrectVal(ReqObj.UserDetail.blusrdtl.glid, "")
          : ReturnCorrectVal(data["s_glusrid"], ""),
    };
  
    if (isSet(data["s_authkey"]) && data["s_authkey"] != "") {
      ajaxData["verify_process"] = "ONLINE";
      ajaxData["auth_key"] = ReturnCorrectVal(data["s_authkey"], "");
    } else {
      ajaxData["OTPResend"] = ReturnCorrectVal(data["OTPResend"], 1);
    }
  
    if (
      data["flag"] == "bl" ||
      data["flag"] == "BL" ||
      data["flag"] == "chatbl" ||
      data["flag"] == "CHATBL" ||
      data["flag"] === "chatbl-inline"
    ) {
      ajaxData["process"] = "OTP_PBRForm_Desktop";
      ajaxData["user_updatedusing"] = "PBRForm";
      if (isSet(data["s_authkey"])) {
        ajaxData["verify_screen"] =
          ReturnCorrectVal(data["verify_screen"], "default") === "ssb"
            ? "OTP_AdvancePBRForm_Desktop"
            : "DESKTOP PBR FORM";
      }
    } else {
      ajaxData["process"] = "OTP_CentralisedEnqForm_Desktop";
      ajaxData["user_updatedusing"] = "DESKTOP ENQUIRY FORM";
      if (isSet(data["s_authkey"])) {
        ajaxData["verify_screen"] = "DESKTOP ENQUIRY FORM";
      }
    }
  
    return ajaxData;
  };
  
  UserVerification.prototype.getOTPAjaxURL = function () {
    var url = "//login.indiamart.com/users/OTPverification/";
    if (
      appsServerName == "//dev-apps.imimg.com/" ||
      appsServerName == "//stg-apps.imimg.com/"
    ) {
      url = "//dev1-login.indiamart.com/users/OTPVerification/";
      // url = '//stg1-login.indiamart.com/users/OTPverification/';
    }
    return url;
  };
  UserVerification.prototype.sendRequest = function ( data, type, verifyObject, userVerificationObject, tmpId) {
    var form_type = ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
    var that = userVerificationObject;
    var ajaxData = that.getAjaxData(data);
    var ajaxURL = that.getOTPAjaxURL();
    if ((isSSB(tmpId) || isEnq(tmpId)) && ReqObj.Form[tmpId].isSkipOTPClicked) {
      PostAjax(verifyObject, tmpId);
      return;
    }
    $.ajax({
      cache: false,
      url: ajaxURL,
      type: "POST",
      crossOrigin: true,
      crossDomain: true,
      data: ajaxData,
      dataType: "json",
      success: function (res) {
        if (isSet(res)) {
          var imeshcookie = that.imeshCookie;
          ReqObj["OTPratelimitstatus"] = res.Response.Status;
          ReqObj["OTPratelimitmessage"] = res.Response.Message;
  
          if (that.otpCount !== 0 &&ReqObj["OTPratelimitstatus"] !== "Access Denied") {
            that.handleUI(tmpId, "showmessage", "", "");
          }
          if (ReqObj["OTPratelimitstatus"] === "Access Denied") {
            that.handleUI(tmpId, "ratelimitmessage", "", "");
          }
  
          if (isSet(res.Response) && res.Response.Status === "Success") {
            var block_case = 1;
            if (checkblockedUser() && im_issExist() === "") {
              block_case = 2;
              ReqObj.UserDetail["blusrdtl"]["glid"] = res.Response.Glusrid;
            }
            if (type === 1 || type === 3) {
              that.otpCount++;
            } else if (type === 2) {
              var imcookie;
              if (imeshcookie.indexOf("uv") === -1)
                imeshcookie += imeshcookie.charAt(imeshcookie.length - 1) === "|" ? "uv=V" : "|uv=V";
              imcookie = stringToObject(imeshcookie, "|");
              imcookie["uv"] = "V";
              imesh_obj.set(imcookie); /* once user is verified, imesh cookie is set. */
              if ( block_case === 2 && isSet(res.Response.LOGIN_DATA) && isSet(res.Response.LOGIN_DATA.DataCookie)) {
                imesh_obj.set(res.Response.LOGIN_DATA.DataCookie);
                ReqObj.UserDetail.blusrdtl.blkUsr = res.Response.LOGIN_DATA.DataCookie["uv"] === "V" ? 0 : ReqObj.UserDetail.blusrdtl.blkUsr;
                UpdateUserDetailKey();
              }
              usercookie.deleteCookie("imEqGl"); /* since user is verified, we need to clear the imEqGl cookie */
              that.updateFulllogin(res);
              if (ReqObj.Form[tmpId].formType.toLowerCase() === "bl" ||ReqObj.Form[tmpId].formType.toLowerCase() === "enq")
                ReqObj.Form[tmpId].toFireIsq = true; // check if any other issue
              if (typeof getLoginStringv1 === "function") getLoginStringv1(); // imlogin
              blenqGATracking(form_type, "confirmOTP", getEventLabel(), 1, tmpId);
              $("#t" + tmpId + "_byrinfo").removeClass("bedsnone");
  
              $("#t" + tmpId + "_hdg").removeClass("bedsnone"); /* */
              /* eto-glusr login is hit with loginflag */
              var userlogin = new UserLogin();
              userlogin.sendRequest({
                data: {
                  logObject: "",
                  tmpId: tmpId,
                  userlogin: userlogin,
                  blureve: false,
                  todo: "verifyusr",
                },
              });
              if ( isSet(ReqObj.Form[tmpId].RemainingService) && ReqObj.Form[tmpId].RemainingService.length > 0 && !ShowOtp() && ReqObj.Form[tmpId].flags.ImEqgl) {
                formatServices(ReqObj.Form[tmpId].RemainingService, tmpId);
  
                if (isSet(ReqObj.Form[tmpId].ServiceSequence)) {
                  while (ReqObj.Form[tmpId].ServiceSequence.length > 0) {
                    if (isSet(ReqObj.Form[tmpId].ServiceSequence[0]) && isSet(ReqObj.Form[tmpId].ServiceSequence[0].fn) && typeof ReqObj.Form[tmpId].ServiceSequence[0].fn.onSubmit ==="function")
                      ReqObj.Form[tmpId].ServiceSequence[0].fn.onSubmit(tmpId);
                    else {
                      if (IsProduction()) {
                        //this is done just not to impact user
                        ReqObj.Form[tmpId].ServiceSequence.pop();
                      }
                    }
                  }
                }
              }
              PostAjax(verifyObject, tmpId);
            }
          } else {
            if ( parseInt(res.Response.Code) === 204 && res.Response.Message === "OTP not Verified") {
              that.handleUI(tmpId, "verificationFailed", "afterRequest", "");
              RemoveObjFromHit(verifyObject, tmpId);
              return;
            }
          }
        } else {
          blenqGATracking(form_type,"service:OtpAuthentication:failure","response undefined",1,tmpId);
          RemoveObjFromHit(verifyObject, tmpId);
        }
      },
      error: function (res) {
        res = isSet(res) ? JSON.stringify(res) : "response undefined";
        blenqGATracking(form_type,"service:OtpAuthentication:failure",res,1,tmpId);
        RemoveObjFromHit(verifyObject, tmpId);
      },
      complete: function (res) {
        if (isSSB(tmpId) && isOTPBoxHidden(tmpId)) {
          onCompleteStep(tmpId);
        }
        IsChatbl(tmpId) ? $("#t" + tmpId + "cbl_msg").parent().addClass("dn") : removeBLLoader(tmpId, "center");
      },
    });
  };
  UserVerification.prototype.updateFulllogin = function (res) {
    var logincookie = "";
    for (var key in res.Response.LOGIN_DATA.LoginCookie) {
      logincookie += key + "=" + res.Response.LOGIN_DATA.LoginCookie[key] + "|";
    }
    usercookie.setCookie("v4iilex", logincookie, 180);
  
    var imis = "";
    for (var key in res.Response.LOGIN_DATA.im_iss) {
      imis += key + "=" + res.Response.LOGIN_DATA.im_iss[key] + "|";
    }
    usercookie.setCookie("im_iss", imis, 180);
  };
  
  UserVerification.prototype.handleUIEmptyOtpBoxes = function (tmpId) {
    $("#t" + tmpId + "bl_enqOtp1").val("");
    $("#t" + tmpId + "bl_enqOtp2").val("");
    $("#t" + tmpId + "bl_enqOtp3").val("");
    $("#t" + tmpId + "bl_enqOtp4").val("");
  };
  
  UserVerification.prototype.handleUI = function (tmpId, todo, when, authkey) {
    var that = this;
    if (todo === "focus") {
      IsChatbl(tmpId)
        ? setTimeout(function () {
            $("#t" + tmpId + "bl_enqOtp1").focus();
          }, 1800)
        : isSSB(tmpId)
        ? ""
        : $("#t" + tmpId + "bl_enqOtp1").focus(); //
    }
    if (todo === "ratelimitmessage") {
      if (!IsChatbl(tmpId)) {
        var otpmessage = ReqObj["OTPratelimitmessage"];
        $("#t" + tmpId + "verifyerrotpdiv").removeClass("bedsnone");
  
        $("#t" + tmpId + "verify_err").html(otpmessage);
  
        if (otpcounter === 1) {
          clearTimeout(myTimeout);
        }
  
        $("#t" + tmpId + "resendOtp")
          .attr("disabled", "disabled")
          .css({
            opacity: "0.4",
            cursor: "default",
          });
        $("#t" + tmpId + "bl_enqMisscall")
          .attr("disabled", "disabled")
          .css({
            opacity: "0.4",
            cursor: "default",
          });
      } else {
        var otpmessage = ReqObj["OTPratelimitmessage"];
        var trimmedString = otpmessage.substring(57, otpmessage.length);
        otpmessage = "Excessive OTP requests, please try post " + trimmedString;
        $("#t" + tmpId + "verify_error")
          .parent()
          .removeClass("dn");
        addChatblError(tmpId, otpmessage);
        if (otpcounter === 1) {
          clearTimeout(myTimeout);
        }
        $("#t" + tmpId + "resendOtp")
          .attr("disabled", "disabled")
          .css({
            opacity: "0.4",
            cursor: "default",
          });
        $("#t" + tmpId + "bl_enqMisscall")
          .attr("disabled", "disabled")
          .css({
            opacity: "0.4",
            cursor: "default",
          });
      }
    }
    if (todo === "showmessage") {
      if (!IsChatbl(tmpId)) {
        $("#t" + tmpId + "verifyerrotpdiv").removeClass("bedsnone");
        $("#t" + tmpId + "verify_err").html("OTP sent on Your Mobile");
      } else {
        $("#t" + tmpId + "verify_error")
          .parent()
          .removeClass("dn");
        addChatblError(tmpId, "OTP sent on Your Mobile");
      }
    }
    if (todo === "refresh") {
      if (!IsChatbl(tmpId))
        $("#t" + tmpId + "verifyerrotpdiv").addClass("bedsnone");
      that.handleUIEmptyOtpBoxes(tmpId);
      if (!isSSB(tmpId)) $("#t" + tmpId + "bl_enqOtp1").focus();
    }
    if (todo === "otpCount1") {
      $("#t" + tmpId + "resendOtp").show(); /* check html ajax */
      $("#t" + tmpId + "verify_err").html("");
    }
  
    if (todo === "otpCount123") {
      $("#t" + tmpId + "bl_enqOtp1").focus();
      $("#t" + tmpId + "resendOtp")
        .attr("disabled", "disabled")
        .css({
          opacity: "0.4",
          cursor: "default",
        });
      $("#t" + tmpId + "bl_enqMisscall")
        .attr("disabled", "disabled")
        .css({
          opacity: "0.4",
          cursor: "default",
        });
      if (that.otpCount !== 3) {
        otpcounter += 1;
        myTimeout = setTimeout(function () {
          $("#t" + tmpId + "resendOtp")
            .removeAttr("disabled")
            .css({
              opacity: "1",
              cursor: "pointer",
            });
          $("#t" + tmpId + "bl_enqMisscall")
            .removeAttr("disabled")
            .css({
              opacity: "1",
              cursor: "pointer",
            });
        }, 20000);
      }
    }
  
    if (todo === "otpCount3") {
      if (IsChatbl(tmpId)) {
        addChatblError(tmpId, "You have exceeded allowed OTP request attempts");
      } else
        $("#t" + tmpId + "verify_err").html(
          "You have exceeded allowed OTP request attempts"
        );
      $("#t" + tmpId + "verifyerrotpdiv").removeClass("bedsnone");
      $("#t" + tmpId + "resendOtp")
        .attr("disabled", "disabled")
        .css({
          opacity: "0.4",
          cursor: "default",
        });
      $("#t" + tmpId + "bl_enqMisscall")
        .attr("disabled", "disabled")
        .css({
          opacity: "0.4",
          cursor: "default",
        });
    }
    if (todo === "verificationFailed" && when === "beforeRequest") {
      if (isSet(authkey) && authkey.length === 0) {
        if (IsChatbl(tmpId)) addChatblError(tmpId, "Please enter OTP");
        else $("#t" + tmpId + "verify_err").html("Please enter OTP");
      } else {
        if (IsChatbl(tmpId)) {
          addChatblError(tmpId, "Please enter correct OTP");
        } else $("#t" + tmpId + "verify_err").html("Please enter correct OTP");
      }
  
      if (isSSB(tmpId)) {
        otpErrorHandling(tmpId, "1");
      }
      $("#t" + tmpId + "verifyerrotpdiv").removeClass("bedsnone");
    }
    if (todo === "verificationFailed" && when === "afterRequest") {
      if (IsChatbl(tmpId)) {
        addChatblError(tmpId, "Please enter correct OTP");
        if (IsChatBLInline(tmpId))
          $("#t" + tmpId + "_submit").removeAttr("disabled");
      } else {
        $("#t" + tmpId + "verify_err").html("Please enter correct OTP");
      }
      if (isSSB(tmpId)) {
        otpErrorHandling(tmpId, "1");
      }
      $("#t" + tmpId + "verifyerrotpdiv").removeClass("bedsnone");
      that.handleUIEmptyOtpBoxes(tmpId);
      $("#t" + tmpId + "bl_enqOtp1").focus();
    }
    if (todo === "tryagain" && when === "afterRequest") {
      $("#t" + tmpId + "verify_err").html(
        "Something went Wrong. Please try Again"
      );
      $("#t" + tmpId + "verifyerrotpdiv").removeClass("bedsnone");
    }
  };
  UserVerification.prototype.handleEvents = function (
    userVerificationObject,
    tmpId
  ) {
    if (!isSet(validation)) createGlobalObject();
    var that = userVerificationObject;
    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    ) {
      $("#t" + tmpId + "bl_enqMisscall").on(
        "click",
        {
          type: 3,
          x: that,
          id: "bl_enqMisscall",
          resend: 0,
          tmpId: tmpId,
        },
        that.sendOtp
      );
      $("#t" + tmpId + "resendOtp").on(
        "click",
        {
          type: 1,
          x: that,
          id: "resendOtp",
          resend: 1,
          tmpId: tmpId,
        },
        that.sendOtp
      );
  
      $("#t" + tmpId + "bl_enqOtp1")
        .on("keypress", validation.isNumberKey)
        .on(
          "keyup",
          {
            param1: "bl_enqOtp1",
            param2: "bl_enqOtp2",
            tmpId: tmpId,
          },
          movetoNext
        );
  
      $("#t" + tmpId + "bl_enqOtp2")
        .on("keypress", validation.isNumberKey)
        .on(
          "keyup",
          {
            param1: "bl_enqOtp2",
            param2: "bl_enqOtp3",
            tmpId: tmpId,
          },
          movetoNext
        )
        .on(
          "keydown",
          {
            param1: "bl_enqOtp2",
            param2: "bl_enqOtp1",
            tmpId: tmpId,
          },
          movetoPrevious
        );
  
      $("#t" + tmpId + "bl_enqOtp3")
        .on("keypress", validation.isNumberKey)
        .on(
          "keyup",
          {
            param1: "bl_enqOtp3",
            param2: "bl_enqOtp4",
            tmpId: tmpId,
          },
          movetoNext
        )
        .on(
          "keydown",
          {
            param1: "bl_enqOtp3",
            param2: "bl_enqOtp2",
            tmpId: tmpId,
          },
          movetoPrevious
        );
  
      $("#t" + tmpId + "bl_enqOtp4")
        .on("keypress", validation.isNumberKey)
        .on(
          "keydown",
          {
            param1: "bl_enqOtp4",
            param2: "bl_enqOtp3",
            tmpId: tmpId,
          },
          movetoPrevious
        );
    }
  };
  
  function Validation() {
    var usercookie = new UserCookie(); //hatadena
    this.result = {
      type: true,
      error: "",
    };
    this.usercountry = currentISO();
  }
  Validation.prototype.isMobileValid = function (mobilenumber) {
    if (this.usercountry === "IN") {
      this.result = {
        type: true,
        error: "",
      };
      //agar true
      if (ValidNumber(mobilenumber)) {
        var mobilenumber = isSet(mobilenumber) ? mobilenumber.trim() : "";
        this.result["error"] =
          mobilenumber.length === 0
            ? "Please Enter Mobile Number"
            : mobilenumber.match(/^[0,2,3,4,5]/)
            ? "Mobile Number should start with 6,7,8,9"
            : mobilenumber.length < 10
            ? "Please Enter valid Mobile number"
            : mobilenumber.length > 10
            ? "Mobile number should contain 10 digits"
            : "";
      } else {
        this.result["error"] = "Please enter a valid Mobile number";
      }
      this.result["type"] = this.result["error"] !== "" ? false : true;
    }
    return this.result;
  };
  Validation.prototype.isMobileFValid = function (mobilenumber) {
    this.result = {
      type: true,
      error: "",
    };
    if (ValidNumber(mobilenumber)) {
      var mobilenumber = isSet(mobilenumber) ? mobilenumber.trim() : "";
      this.result["error"] =
        mobilenumber.length === 0 ? "Please Enter Mobile Number" : "";
    } else {
      this.result["error"] = "Please Enter valid Mobile number";
    }
    this.result["type"] = this.result["error"] !== "" ? false : true;
    return this.result;
  };
  Validation.prototype.isMobileChValid = function (mobilenumber) {
    this.result = {
      type: true,
      error: "",
    };
    var mobilenumber = isSet(mobilenumber) ? mobilenumber.trim() : "";
    if (mobilenumber.length > 0) {
      if (ValidNumber(mobilenumber)) {
        this.result["error"] = "";
      } else {
        this.result["error"] = "Phone Number should be numeric";
      }
    } else this.result["error"] = "";
    this.result["type"] = this.result["error"] !== "" ? false : true;
    return this.result;
  };
  Validation.prototype.isEmailValid = function (email) {
    this.result = {
      type: true,
      error: "",
    };
    var email = isSet(email) ? email : "";
    this.result["error"] =
      email.trim() === ""
        ? ""
        : isHindi(email)
        ? "Please do not use special symbols"
        : !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(email)
        ? "Please Enter Valid Email ID"
        : "";
    this.result["type"] = this.result["error"] !== "" ? false : true;
    this.result["specialcase"] =
      this.result["error"] === "Please do not use special symbols" ? true : false;
    return this.result;
  };
  Validation.prototype.isEmailFilled = function (email) {
    this.result = {
      type: true,
      error: "",
    };
    var email = isSet(email) ? email : "";
    this.result["error"] =
      email.trim() === ""
        ? "Please Enter your Email ID"
        : !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(email)
        ? "Please Enter Valid Email ID"
        : "";
    this.result["type"] = this.result["error"] !== "" ? false : true;
    return this.result;
  };
  Validation.prototype.isTitleValid = function (title) {
    this.result = {
      type: true,
      error: "",
    };
    var title = isSet(title) ? title : "";
    this.result["error"] =
      title.trim().length === 0
        ? "Please Enter Product / Service Name"
        : isHindi(title)
        ? "Please do not use special symbols"
        : "";
    this.result["type"] = this.result["error"] !== "" ? false : true;
    this.result["specialcase"] =
      this.result["error"] === "Please do not use special symbols" ? true : false;
    return this.result;
  };
  
  Validation.prototype.isDescriptionFilled = function (description) {
    this.result = {
      type: true,
      error: "",
    };
    var description = isSet(description) ? description.trim() : "";
    this.result["error"] =
      description.length === 0
        ? ""
        : isScriptTag(description)
        ? "Please do not use special symbols"
        : "";
    this.result["type"] = this.result["error"] !== "" ? false : true;
    this.result["specialcase"] =
      this.result["error"] === "Please do not use special symbols" ? true : false;
    return this.result;
  };
  
  Validation.prototype.isNameValid = function (name) {
    this.result = {
      type: true,
      error: "",
    };
    var name = isSet(name) ? name : "";
    this.result["error"] =
      name.trim().length === 0
        ? "Please Enter Your Name"
        : isHindi(name) || !isAllCharacters(name)
        ? "Please do not use special symbols"
        : isScriptTag(name)
        ? "Please enter valid name"
        : "";
    this.result["type"] = this.result["error"] !== "" ? false : true;
    this.result["specialcase"] =
      this.result["error"] === "Please do not use special symbols" ||
      this.result["error"] === "Please enter valid name"
        ? true
        : false;
    return this.result;
  };
  
  Validation.prototype.isCityValid = function (city) {
    this.result = {
      type: true,
      error: "",
    };
    this.result["error"] =
      city.trim().length === 0
        ? "Please Enter Your City"
        : isHindi(city)
        ? "Please do not use special symbols"
        : isScriptTag(city)
        ? "Please enter valid city name"
        : "";
    this.result["type"] = this.result["error"] !== "" ? false : true;
    this.result["specialcase"] =
      this.result["error"] === "Please do not use special symbols" ||
      this.result["error"] === "Please enter valid city name"
        ? true
        : false;
    return this.result;
  };
  
  Validation.prototype.isQtyUnitValid = function () {
    this.result = {
      type: true,
      error: "",
    };
    return this.result;
  };
  
  Validation.prototype.isNumberKey = function (event) {
    if (isSet(event)) {
      var charCode = event.which;
      if (charCode >= 48 && charCode <= 57) {
        // if (IsChatbl(event.data.tmpId)) {
        //   validation.toShowTick(event);
        // }
        true;
      }
      if (charCode === 118 && event.ctrlKey === true) {
        return true;
      }
      if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
      return true;
    }
  };
  // Validation.prototype.toShowTick = function (event) {
  //   var pressedKeyLength = (event.which === 8) ? 0 : event.key.length;
  //   if ((pressedKeyLength + event.target.value.length) === 10) {
  //     $("#t" + event.data.tmpId + "chatbltick").removeClass("bedsnone");
  //   }
  //   else
  //     $("#t" + event.data.tmpId + "chatbltick").addClass("bedsnone");
  
  // };
  Validation.prototype.isProductNameValid = function (name) {
    this.result = {
      type: true,
      error: "",
    };
    var name = isSet(name) ? name.trim() : "";
    this.result["error"] =
      name.length === 0
        ? "Enter product/service name"
        : !isHindi(name) && !name.match(/[a-zA-Z]/g)
        ? "Please do not use special symbols"
        : isScriptTag(name)
        ? "Please do not use special symbols"
        : "";
    this.result["type"] = this.result["error"] !== "" ? false : true;
    this.result["specialcase"] =
      this.result["error"] === "Please do not use special symbols" ? true : false;
  
    return this.result;
  };
  Validation.prototype.isCountryValid = function (country, tmpId) {
    this.result = {
      type: true,
      error: "",
    };
    var name = isSet(country) ? country.trim() : "";
    this.result["error"] = name.length === 0 ? "Please Select Country" : "";
    if (
      ReqObj.Form[tmpId].UserInputs["CountryName"] === "" ||
      typeof ReqObj.Form[tmpId].UserInputs["CountryName"] === "undefined"
    ) {
      this.result["error"] = "Country must be chosen from suggestions";
    }
    this.result["type"] = this.result["error"] !== "" ? false : true;
    return this.result;
  };
  
  Validation.prototype.isGstValid = function (gnumber, tmpId) {
    this.result = {
      type: true,
      error: "",
    };
    var gname = isSet(gnumber) ? gnumber.trim() : "";
    this.result["error"] =
      gname == ""
        ? ""
        : gname.match(/^[0-9a-zA-Z]+$/)
        ? ""
        : "Please enter valid number";
    this.result["type"] = this.result["error"] !== "" ? false : true;
    return this.result;
  };
  
  Validation.prototype.isCnameValid = function (cname, tmpId) {
    this.result = {
      type: true,
      error: "",
      error_type: "",
    };
    var type = true,
      error = "",
      error_type = "";
    var re = /[a-zA-Z]/;
    if (cname !== "") {
      if (cname.length <= 2) {
        type = false;
        error = "Company name must be greater than 2 characters";
      } else if (isAllNumbers(cname)) {
        type = false;
        error = "Company name must be Alphanumeric";
      } else if (isAllSpecialChars(cname)) {
        type = false;
        error = "Company name must contain at least one alphabet";
      } else if (!re.test(cname)) {
        type = false;
        error = "Company name must contain at least one alphabet";
      } else if (checkJunkCname(cname)) {
        type = false;
        error = "Junk Values in Company name";
      }
      if (isScriptTag(cname)) {
        type = false;
        error = "Enter valid company name";
        error_type = "Script Tag";
      }
    }
    this.result["error_type"] = error_type;
    this.result["type"] = type;
    this.result["error"] = error;
    return this.result;
  };
  
  function checkJunkCname(cname) {
    var junkCname = [
      /\b(no company)\b/,
      /\b(no name)\b/,
      /\b(not applicable)\b/,
      /\b(person)\b/,
      /\b(personal)\b/,
      /\b(individual)\b/,
    ];
  
    for (var x in junkCname) {
      var re = new RegExp(junkCname[x]);
      if (isSet(cname.match(re))) return true;
    }
    return false;
  }
  Validation.prototype.isURLValid = function (website, tmpId) {
    this.result = {
      type: true,
      error: "",
      error_type: "",
    };
    var sitename = "indiamart";
    var website = website.toLowerCase();
    var count = (website.match(/https:/g) || website.match(/http:/g) || [])
      .length;
    if (website.length != 0) {
      var m = website.split("http://");
      var validarr = website.split(".");
      var re =
        /^(http[s]?:\/\/){0,1}(www[0-9]?\.){0,1}[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-]{2,}([\.][a-zA-Z0-9\-]{2,})*(\/([a-zA-Z0-9]+[\-\_\.]?)*)*$/;
      var re2 = /[^a-zA-Z0-9]+$/;
      var re3 = /[^\/]$/;
      var re1 = /[^0-9a-zA-Z]{2,}/;
      var dotCount = isSet(website.match(/\./g))
        ? website.match(/\./g).length
        : 0;
      website = website.replace(/\/$/, "");
      if (sitename) {
        sitename = sitename.replace(/http:\/\//, "");
        sitename = sitename.replace(/https:\/\//, "");
        sitename = sitename.replace(/[\/]$/, "");
      }
      if (website.length > 100) {
        this.result["error"] =
          "Web Site Address (URL) should not exceed 100 characters";
      } else if (sitename && website.match(sitename)) {
        this.result["error"] = "Can't be same as IndiaMART url";
      } else if (website.match("indiamart.com")) {
        this.result["error"] = "Can't use IndiaMART url here";
      } else if (website.indexOf(" ") != -1) {
        this.result["error"] =
          "Please enter correct URL without any spaces in it.";
      } else if (/\"+/g.test(website)) {
        this.result["error"] =
          "Please do not use double quotes" /*'Please enter correct URL without any quotes in it.'*/;
      } else if (/\|+/g.test(website)) {
        this.result["error"] =
          "Please do not use Pipe sign" /*'Please enter correct URL without any Pipe Symbols in it.'*/;
      } else if (
        count > 1 ||
        website.indexOf("@") != -1 ||
        website.indexOf(".") == -1 ||
        validarr[0].length < 2 ||
        (dotCount == 2 && validarr[1].length <= 2) ||
        (dotCount == 1 && validarr[0].length <= 2) ||
        website.length < 2
      ) {
        this.result["error"] = "Invalid Website ! Please enter valid website.";
      } else if (
        (website.indexOf("http://") == 0 ||
          website.indexOf("https://") == 0 ||
          website.indexOf("www.") == 0) &&
        dotCount !== 2
      ) {
        this.result["error"] =
          "Website must start with http:// or https:// or www.";
      } else if (!re.test(website) || re1.test(m[1]) || re2.test(website)) {
        this.result["error"] = "Invalid Website ! Please enter valid website.";
      }
      if (isScriptTag(website)) {
        this.result["error"] = "Invalid Website ! Please enter valid website.";
        this.result["error_type"] = "Js error";
      }
    }
    this.result["type"] = this.result["error"] !== "" ? false : true;
    return this.result;
  };
  var validation = new Validation();
  var isBlEnqLoaded = true;
  var isChatBlSequenceUpdated = false;
  var ischatblnextquestionasked = false;
  var isChatWidgetOpen = false;
  // for generating event
  var FormCloseEvent = jQuery.Event("formClose");
  var OnBlEnqClose = jQuery.Event("onBLEnqClose");
  //form load event
  var ReqFormScriptLoaded = jQuery.Event("ReqFormLoaded");
  $("body").trigger(ReqFormScriptLoaded);
  
  function DescMapWithId(tmpId, optionDesc, optionId) {
    ReqObj.Form[tmpId].IdMapDesc = {};
    for (i = 0; i < optionDesc.length; i++) {
      ReqObj.Form[tmpId].IdMapDesc[optionDesc[i].toLowerCase()] = optionId[i];
    }
  }
  
  function convertHtml(IsqObj, tmpId, ObjectPosition) {
    if (!isSet(ObjectPosition)) ObjectPosition = 0;
    ReqObj.Form[tmpId].questionCount += 1;
    var option_desc = IsqObj.IM_SPEC_OPTIONS_DESC
      ? IsqObj.IM_SPEC_OPTIONS_DESC.split(IsqSeperator)
      : [];
    var option_id = IsqObj.IM_SPEC_OPTIONS_ID
      ? IsqObj.IM_SPEC_OPTIONS_ID.split(IsqSeperator)
      : [];
    var IsOptionIdEmpty = isSet(option_id) && option_id.length > 0 ? true : false;
    IsqObj.IM_SPEC_MASTER_FULL_DESC =
      isSet(IsqObj.IM_SPEC_MASTER_FULL_DESC) &&
      IsqObj.IM_SPEC_MASTER_FULL_DESC !== "" &&
      IsqObj.IM_SPEC_MASTER_FULL_DESC.length > 40
        ? IsqObj.IM_SPEC_MASTER_FULL_DESC.substr(0, 60) + "..."
        : IsqObj.IM_SPEC_MASTER_FULL_DESC;
    var prefilledAns = FillIsq(IsqObj.IM_SPEC_MASTER_DESC, tmpId);
    prefilledAns = prefilledAns === null ? "" : prefilledAns;
    var type = returnIsqObjType(tmpId, IsqObj);
    switch (type) {
      case 1:
        return typeText({
          data: {
            tmpId: tmpId,
            IsqObj: IsqObj,
            keys: {
              ObjectPosition: ObjectPosition,
              prefilledAns: prefilledAns,
              option_id: option_id,
              option_desc: option_desc,
              IsOptionIdEmpty: IsOptionIdEmpty,
            },
          },
        });
      case 2:
        return typeRadio({
          data: {
            tmpId: tmpId,
            IsqObj: IsqObj,
            keys: {
              ObjectPosition: ObjectPosition,
              prefilledAns: prefilledAns,
              option_id: option_id,
              option_desc: option_desc,
              IsOptionIdEmpty: IsOptionIdEmpty,
            },
          },
        });
      case 3:
        return typeSelect({
          data: {
            tmpId: tmpId,
            IsqObj: IsqObj,
            keys: {
              ObjectPosition: ObjectPosition,
              prefilledAns: prefilledAns,
              option_id: option_id,
              option_desc: option_desc,
              IsOptionIdEmpty: IsOptionIdEmpty,
            },
          },
        });
      case 4:
        return typeCheckBox({
          data: {
            tmpId: tmpId,
            IsqObj: IsqObj,
            keys: {
              ObjectPosition: ObjectPosition,
              prefilledAns: prefilledAns,
              option_id: option_id,
              option_desc: option_desc,
              IsOptionIdEmpty: IsOptionIdEmpty,
            },
          },
        });
      case 5:
        return typeQuantity({
          data: {
            tmpId: tmpId,
            IsqObj: IsqObj,
            keys: {
              ObjectPosition: ObjectPosition,
              prefilledAns: prefilledAns,
              option_id: option_id,
              option_desc: option_desc,
              IsOptionIdEmpty: IsOptionIdEmpty,
              type: "qt",
            },
          },
        });
      case 6:
        return typeQuantity({
          data: {
            tmpId: tmpId,
            IsqObj: IsqObj,
            keys: {
              ObjectPosition: ObjectPosition,
              prefilledAns: prefilledAns,
              option_id: option_id,
              option_desc: option_desc,
              IsOptionIdEmpty: IsOptionIdEmpty,
              type: "ut",
            },
          },
        });
    }
  }
  
  function returnIsqObjType(tmpId, IsqObj) {
    if (IsqObj.IM_SPEC_MASTER_DESC.toLowerCase() === "quantity") return 5;
    else if (IsqObj.IM_SPEC_MASTER_DESC.toLowerCase() === "quantity unit")
      return 6;
    else return parseInt(IsqObj.IM_SPEC_MASTER_TYPE);
  }
  /*---------------------------------------return Empty Object--------------------------------------------*/
  
  function returnEmptyObject() {
    return {
      OuterWrapper: "<div>",
      beforeLabel: "",
      Label: "",
      beforeInput: "",
      UserInput: "",
      ClosingWrapper: "</div>",
    };
  }
  /* ---------------------------------------------------TYPE : text ---------------------------------------------------- */
  
  function typeText(event) {
    var QuestionObject = returnIsqQuestionObject({
      data: {
        type: "TEXTBOX",
        questionText: event.data.IsqObj.IM_SPEC_MASTER_DESC,
        questionId: isSet(event.data.IsqObj.IM_SPEC_MASTER_ID)
          ? event.data.IsqObj.IM_SPEC_MASTER_ID
          : "",
        optionSelector: "",
        others: [],
      },
    });
    var textboxObject = returnIsqHtmlObject(event, QuestionObject);
    textboxObject["optionId"] = event.data.keys.IsOptionIdEmpty
      ? event.data.keys.option_id
      : false;
    textboxObject["inputId"] =
      event.data.tmpId.substr(0, 2) === "09" &&
      ReqObj.Form[event.data.tmpId].formType.toLowerCase() === "bl"
        ? "t" +
          event.data.tmpId +
          "txtbx_option" +
          ReqObj.Form[event.data.tmpId].questionCount +
          (ReqObj.Form[event.data.tmpId].FormSequence.StepCounter + 1)
        : "t" +
          event.data.tmpId +
          "txtbx_option" +
          ReqObj.Form[event.data.tmpId].questionCount;
    textboxObject["inputName"] =
      "t" +
      event.data.tmpId +
      "text_name" +
      ReqObj.Form[event.data.tmpId].questionCount;
    textboxObject["ans"] = event.data.keys.prefilledAns;
    textboxObject["placeholder"] = IsChatbl(event.data.tmpId)
      ? " Enter " + QuestionObject.questionText
      : "";
  
    if (
      isImageVidEnq(event.data.tmpId) &&
      ReqObj.Form[event.data.tmpId].FormSequence.StepCounter > 0 &&
      isSet(ReqObj.Form[event.data.tmpId].isQtutShown) &&
      ReqObj.Form[event.data.tmpId].isQtutShown === true &&
      textboxObject.QuestionDesc.toLowerCase() === "quantity"
    )
      return returnEmptyObject();
    ReqObj.Form[event.data.tmpId].isQtutShown =
      isImageVidEnq(event.data.tmpId) &&
      ReqObj.Form[event.data.tmpId].FormSequence.StepCounter < 1
        ? true
        : false;
    QuestionObject.optionSelector =
      "input[name='" + textboxObject.inputName + "']";
    /* CSS related */
    textboxObject["divClass"] =
      event.data.keys.ObjectPosition > 0 && !IsChatbl(event.data.tmpId)
        ? "bepr beclr isq-st19"
        : "bepr beclr";
    textboxObject["lblClass"] = " be-lbl";
    textboxObject["inputClass"] = !IsChatbl(event.data.tmpId)
      ? isImageVidEnq(event.data.tmpId) &&
        ReqObj.Form[event.data.tmpId].FormSequence.StepCounter < 1
        ? "be-input beisq-tbx bg-white inpt_errorbx imgoneqty"
        : isSSB(event.data.tmpId)
        ? ""
        : (pdpInactiveBL(event.data.tmpId)) ? "be-w50 lgcont be-input beisq-tbx bg-white inpt_errorbx cbl_br10 cpNm" : "be-input beisq-tbx bg-white inpt_errorbx"
      : "cbl_txt"; /* WARNING - Don't use imgoneqty class anywhere else */
    textboxObject["inputClass"] =
      isOtherEnq(event.data.tmpId) &&
      textboxObject.QuestionDesc.toLowerCase() !== "quantity"
        ? textboxObject["inputClass"] + " txtblng"
        : textboxObject["inputClass"];
    if (event.data.keys.ObjectPosition > 0 && IsChatbl(event.data.tmpId)) {
      textboxObject["inputClass"] = !IsChatbl(event.data.tmpId)
        ? textboxObject["inputClass"] + " be-chatW"
        : "cbl_qunty";
    }
    var descriptionHtml =
      isImageVidEnq(event.data.tmpId) &&
      ReqObj.Form[event.data.tmpId].FormSequence.StepCounter < 1
        ? ""
        : Tooltip("text", event.data.IsqObj.IM_SPEC_MASTER_FULL_DESC);
    var lblClass = "lbtool";
    textboxObject["lblin"] = true;
    if (
      isImageVidEnq(event.data.tmpId) &&
      ReqObj.Form[event.data.tmpId].FormSequence.StepCounter < 1
    ) {
      lblClass = "";
      textboxObject["lblin"] = false;
    }
    var typetextHtmlObj = {
      OuterWrapper:
        isSSB(event.data.tmpId) || isBlInline(event.data.tmpId)
          ? ""
          : "<div class='" + textboxObject.divClass + "'>",
      beforeLabel: "",
      Label: isSSB(event.data.tmpId)
        ? "<label class = '" +
          ssbClass("label", event.data.tmpId) +
          "'>" +
          textboxObject.QuestionDesc +
          "</label>"
        : "<div class='" +
          lblClass +
          "'>" +
          MakeLabel(textboxObject, descriptionHtml, event.data.tmpId) +
          "</div>",
      beforeInput: "",
      UserInput: isSSB(event.data.tmpId)
        ? isnewSSB(event.data.tmpId)
          ? TextBoxIp(textboxObject)
          : '<div class="mb-InCon">' + TextBoxIp(textboxObject) + "</div>"
        : TextBoxIp(textboxObject),
      ClosingWrapper: "</div>",
    };
    var html = "";
    html += returnContainer(
      textboxObject["inputId"],
      "_err",
      "texterr errpdg bedsnone",
      "",
      ""
    );
    html += returnContainer(
      textboxObject["inputId"],
      "_errmsg",
      "",
      "content",
      ""
    );
    html += "</div>Please enter valid input</div>";
    typetextHtmlObj["UserInput"] = typetextHtmlObj["UserInput"] + "" + html;
    //typetextHtmlObj["UserInput"] = typetextHtmlObj["UserInput"] + "</div>" + html; // isq disappear backbutton
    ReqObj.Form[event.data.tmpId].Isq.Question.push(QuestionObject);
    return typetextHtmlObj;
  }
  /* ---------------------------------------------------TYPE : Radio ---------------------------------------------------- */
  
  function typeRadio(event) {
    ReqObj.Form[event.data.tmpId].toAppendQues = IsChatBLInline(event.data.tmpId)
      ? true
      : false;
    var QuestionObject = returnIsqQuestionObject({
      data: {
        type: "RADIO",
        questionText: event.data.IsqObj.IM_SPEC_MASTER_DESC,
        questionId: isSet(event.data.IsqObj.IM_SPEC_MASTER_ID)
          ? event.data.IsqObj.IM_SPEC_MASTER_ID
          : "",
        optionSelector: "",
        others: [],
      },
    });
    var screen_no =
      event.data.tmpId.substr(0, 2) === "09" &&
      ReqObj.Form[event.data.tmpId].formType.toLowerCase() === "bl"
        ? ReqObj.Form[event.data.tmpId].FormSequence.StepCounter + 1
        : "";
    var RadioboxObject = returnIsqHtmlObject(event, QuestionObject);
    // ReqObj.Form[event?.data?.tmpId].isNewImage=="1" && (RadioboxObject["lblClass"] = " be-lbl");  js error unexpected token '.'
    isSet(ReqObj.Form[event.data.tmpId].isNewImage) &&
      ReqObj.Form[event.data.tmpId].isNewImage == "1" &&
      (RadioboxObject["lblClass"] = " be-lbl");
    var descriptionHtml = Tooltip(
      "radio",
      event.data.IsqObj.IM_SPEC_MASTER_FULL_DESC
    );
    QuestionObject.optionSelector =
      "input[name='" +
      "t" +
      event.data.tmpId +
      "radio_name" +
      ReqObj.Form[event.data.tmpId].questionCount +
      screen_no +
      "']";
    var typeRadioHtmlObj = {
      OuterWrapper:
        isSSB(event.data.tmpId) &&
        event.data.IsqObj.IM_SPEC_MASTER_DESC === "Looking for suppliers"
          ? "<div class='" + ssbClass("wrprClass", event.data.tmpId) + "'>"
          : "",
      Label: isSSB(event.data.tmpId)
        ? LabelForCheckAndRadio(
            RadioboxObject,
            descriptionHtml,
            event.data.tmpId,
            ""
          )
        : "<div class='lbtool'>" +
          LabelForCheckAndRadio(
            RadioboxObject,
            descriptionHtml,
            event.data.tmpId,
            ""
          ) +
          "</div>",
      ClosingWrapper:
        isSSB(event.data.tmpId) &&
        event.data.IsqObj.IM_SPEC_MASTER_DESC === "Looking for suppliers"
          ? "</div>"
          : "",
    };
  
    typeRadioHtmlObj["UserInput"] = IsChatbl(event.data.tmpId)
      ? "<div class = 'cbl_radio'>"
      : isBlInline(event.data.tmpId)
      ? "<div class='iwChk'>"
      : isSSB(event.data.tmpId) && isnewSSB(event.data.tmpId)
      ? "<div class='nb-flex nb-aic nb-flwp nb-mt10'>"
      : "<div class=''>";
  
    if (isSet(event.data.keys.option_desc)) {
      var len = event.data.keys.option_desc.length;
      for (var i = 0; i < len; i++) {
        var indexofAns = -1;
        var optionDesc = event.data.keys.option_desc[i];
        if (isSet(optionDesc)) {
          optionDesc = trimVal(optionDesc);
        }
        if (event.data.keys.prefilledAns.length > 0) {
          //indexofAns = $.inArray(optionDesc, event.data.keys.prefilledAns); // 1 Kg and kg case mismatch issue
          var defaultResult = -1;
          var indexofAns = defaultResult;
          $.each(event.data.keys.prefilledAns, function (index, value) {
            if (
              indexofAns == defaultResult &&
              value.toLowerCase() == optionDesc.toLowerCase()
            ) {
              indexofAns = index;
            }
          });
  
          if (indexofAns !== -1)
            event.data.keys.prefilledAns.splice(indexofAns, 1);
        }
        if (
          checkdefaultIsq(
            event.data.tmpId,
            QuestionObject.questionText,
            QuestionObject.type,
            optionDesc
          )
        ) {
          indexofAns = 1;
          typeRadioHtmlObj["WrapClass"] = "dn";
        }
        if (
          optionDesc.trim().toLowerCase() === "others" ||
          optionDesc.trim().toLowerCase() === "other"
        ) {
          var cbl_br = (pdpInactiveBL(event.data.tmpId)) ? "cbl_br10" : "";
          var OtherObject = {
            divClass: isSSB(event.data.tmpId)
              ? "t" +
                event.data.tmpId +
                "be-radioboxtemp be-radiobox t" +
                event.data.tmpId +
                "other_radiotemp"
              : "t" +
                event.data.tmpId +
                "be-radioboxtemp be-radiobox oth_bx other_radio t" +
                event.data.tmpId +
                "other_radiotemp " +  cbl_br,
            optionId: event.data.keys.IsOptionIdEmpty
              ? event.data.keys.option_id[i]
              : "",
            inputName:
              "t" +
              event.data.tmpId +
              "other_radio_name" +
              ReqObj.Form[event.data.tmpId].questionCount,
            inputId:
              "t" +
              event.data.tmpId +
              "other_radio_name" +
              ReqObj.Form[event.data.tmpId].questionCount +
              "_option" +
              (i + 1),
            ans: indexofAns === -1 ? event.data.keys.prefilledAns : "",
          };
          typeRadioHtmlObj["UserInput"] += OthersBox(
            OtherObject,
            event.data.tmpId
          );
          QuestionObject["others"].push(
            "#" +
              "t" +
              event.data.tmpId +
              "other_radio_name" +
              ReqObj.Form[event.data.tmpId].questionCount +
              "_option" +
              (i + 1)
          );
        } else {
          var RadioBoxObject = {
            option_id: event.data.keys.IsOptionIdEmpty
              ? event.data.keys.option_id[i]
              : "",
            templateId: "t" + event.data.tmpId,
            questionCount: ReqObj.Form[event.data.tmpId].questionCount,
            option_desc: event.data.keys.option_desc[i],
            i: i,
          };
          var radSubmit = IsChatBLInline(event.data.tmpId)
            ? " t" + event.data.tmpId + "_radSubmit"
            : "";
          RadioBoxObject["inputClass"] = IsChatbl(event.data.tmpId)
            ? "cbl_chekbx_btn"
            : "bevT bedblk";
          RadioBoxObject["labelClass"] = IsChatbl(event.data.tmpId)
            ? "cbl_chekbx_label CheckboxClick"
            : "bepr CheckboxClick";
          RadioBoxObject["divClass1"] =
            indexofAns !== -1
              ? "t" +
                event.data.tmpId +
                "be-radioboxtemp be-radiobox sl-box chksl"
              : IsChatbl(event.data.tmpId)
              ? IsChatBLInline(event.data.tmpId)
                ? "cbl_rdon cbl_df cbl_aic cbl_ml20" + radSubmit
                : "cbl_chekbx cbl_df cbl_aic cbl_ml20" + radSubmit
              : isSSB(event.data.tmpId)
              ? ssbClass("radin", event.data.tmpId)
              : (pdpInactiveBL(event.data.tmpId)) ? "be-chckbox cbl_br10" : "be-chckbox";
          RadioBoxObject["divClass2"] =
            indexofAns !== -1 ? "berdio-sl" : "berdio-sl bedsnone";
          RadioBoxObject["inputClass"] =
            indexofAns !== -1
              ? "eqVam bedblk radioClick waschecked"
              : isSSB(event.data.tmpId)
              ? ssbClass("radio", event.data.tmpId)
              : "eqVam bedblk radioClick";
          RadioBoxObject["checked"] = indexofAns !== -1 ? "checked" : "";
          RadioBoxObject["spanClass"] =
            indexofAns !== -1
              ? IsChatbl(event.data.tmpId) || isSSB(event.data.tmpId)
                ? ""
                : "bevT bedblk beisq3 w-txt"
              : IsChatbl(event.data.tmpId) || isSSB(event.data.tmpId)
              ? ""
              : "bevT bedblk beisq3";
          if (event.data.IsqObj.IM_SPEC_MASTER_DESC === "Looking for suppliers") {
            RadioBoxObject["cityFunc"] = "onclick = radCheck(this)";
            if (
              indexofAns !== -1 &&
              RadioBoxObject.option_desc.toLowerCase() === "specific city"
            )
              RadioBoxObject["spanClass"] += " specCity";
          }
          typeRadioHtmlObj["UserInput"] += RadioBox(
            event.data.tmpId,
            RadioBoxObject
          );
        }
      }
    }
    typeRadioHtmlObj["UserInput"] +=
      RadioboxObject["QuestionDesc"].toLowerCase() === "why do you need this" &&
      isSSB(event.data.tmpId)
        ? "</div></div>"
        : "</div>";
    // changes for ssb (single page)
    if (isSet(OtherObject) && isSet(OtherObject["inputId"])) {
      var html = "";
      html += returnContainer(
        OtherObject["inputId"],
        "_err",
        "texterr bedsnone",
        "",
        ""
      );
      html += returnContainer(
        OtherObject["inputId"],
        "_errmsg",
        "",
        "content",
        ""
      );
      html += "</div>Please enter valid input</div>";
      typeRadioHtmlObj["UserInput"] =
        typeRadioHtmlObj["UserInput"] + "</div>" + html;
    }
    ReqObj.Form[event.data.tmpId].Isq.Question.push(QuestionObject);
    return typeRadioHtmlObj;
  }
  
  /* ---------------------------------------------------TYPE : Select ---------------------------------------------------- */
  
  function typeSelect(event) {
    var typeSelectHtmlObj = {};
    var QuestionObject = returnIsqQuestionObject({
      data: {
        type: "SELECT",
        questionText: isSet(event.data.IsqObj.IM_SPEC_MASTER_DESC)
          ? event.data.IsqObj.IM_SPEC_MASTER_DESC
          : "",
        questionId: isSet(event.data.IsqObj.IM_SPEC_MASTER_ID)
          ? event.data.IsqObj.IM_SPEC_MASTER_ID
          : "",
        optionSelector: "",
        others: [],
      },
    });
    var tmpId = event.data.tmpId;
    var selectObject = returnIsqHtmlObject(event, QuestionObject);
    selectObject["onchange"] = false;
    selectObject["optionValue"] = "Select a value";
    selectObject["selectName"] =
      "t" +
      event.data.tmpId +
      "select_name" +
      ReqObj.Form[event.data.tmpId].questionCount;
    selectObject["selectId"] =
      "t" +
      event.data.tmpId +
      "select_name" +
      ReqObj.Form[event.data.tmpId].questionCount;
    QuestionObject.optionSelector = IsChatbl(event.data.tmpId)
      ? "#t" +
        event.data.tmpId +
        "_selectDD" +
        ReqObj.Form[event.data.tmpId].questionCount
      : "select[name='" + selectObject.selectName + "']";
    if (
      isImageVidEnq(event.data.tmpId) &&
      ReqObj.Form[event.data.tmpId].FormSequence.StepCounter > 0 &&
      isSet(ReqObj.Form[event.data.tmpId].isQtutShown) &&
      ReqObj.Form[event.data.tmpId].isQtutShown === true &&
      selectObject.QuestionDesc.toLowerCase() === "quantity unit"
    )
      return returnEmptyObject();
  
    selectObject["divClass"] =
      currentISO() !== "IN" &&
      QuestionObject.questionText.toLowerCase() === "total order value"
        ? "bedblk bepr mr20"
        : "bedblk bepr";
    selectObject["lblClass"] = "be-lbl";
    selectObject["selectClass"] = IsChatbl(event.data.tmpId)
      ? "cbl_selct_unit _ul_select dn"
      : isSSB(event.data.tmpId)
      ? isnewSSB(tmpId)
        ? "nb-selct betextclr"
        : "mb-selct mb-w230 betextclr"
      : isBlInline(tmpId)
      ? ""
      : (pdpInactiveBL(event.data.tmpId)) ? "be-input bewfull betextclr cbl_br10 cpNm" : "be-input bewfull betextclr";
    selectObject["selectClass"] =
      event.data.keys.ObjectPosition > 0 &&
      IsChatbl(event.data.tmpId) &&
      !IsChatbl(event.data.tmpId)
        ? selectObject["selectClass"] + " be-chatW slt-styl"
        : selectObject["selectClass"];
    selectObject["divClass"] = !IsChatbl(event.data.tmpId)
      ? selectObject["divClass"] + " be-w50 lgcont"
      : selectObject["divClass"];
    selectObject["optionValue"] = SelBoxMSg(
      selectObject.QuestionDesc,
      event.data.tmpId
    );
    if (isBlInline(tmpId)) selectObject["divClass"] = "";
    var optionHtml = ""; //
    var selBoxPrefilled = false;
    var OtherOptionId = "";
    var OtherOptionDesc = "";
    var OtherOptionVal = "";
    var chatBlSpecificObject = {
      readonly:
        '<input type="text" value = "" readonly="" class="cbl_unit" id = "t' +
        event.data.tmpId +
        "_selectDD" +
        ReqObj.Form[event.data.tmpId].questionCount +
        '" name="select_unit" maxlength="1000" autocomplete="off" placeholder= "' +
        selectObject["optionValue"] +
        '">',
      arrow:
        "<div onclick = \"funcClick(this,'" +
        event.data.tmpId +
        "', " +
        ReqObj.Form[event.data.tmpId].questionCount +
        ' )"><svg class="cbl_arw" id = "t' +
        event.data.tmpId +
        '_select_box"><use xlink:href="#t' +
        event.data.tmpId +
        'dwnarow"></use></svg></div>',
      chatblOuterdiv:
        selectObject.QuestionDesc === "Currency"
          ? '<div class="cbl_selct cbl_pr cbl_df cbl_aic cbl_curr">'
          : '<div class="cbl_selct cbl_pr cbl_df cbl_aic">',
      chatblClosingdiv: "</div>",
    };
  
    if (isSet(event.data.keys.option_desc)) {
      var len = event.data.keys.option_desc.length;
      for (var i = 0; i < len; i++) {
        var selected = "";
        var optionDesc = isSet(event.data.keys.option_desc[i])
          ? trimVal(event.data.keys.option_desc[i])
          : "";
        var str = handleSpecialQuotes(optionDesc);
        if ($.inArray(optionDesc, event.data.keys.prefilledAns) !== -1) {
          // maps!
          selected = " selected";
          selectObject["selectClass"] += " beclr3";
          selBoxPrefilled = true;
        }
        if (
          optionDesc.toLowerCase() === "others" ||
          optionDesc.toLowerCase() === "other"
        ) {
          selectObject["onchange"] = true;
          OtherOptionVal = str;
          OtherOptionId = event.data.keys.option_id[i];
          OtherOptionDesc = event.data.keys.option_desc[i];
        } else {
          var element = IsChatbl(event.data.tmpId) ? "li" : "option";
          optionHtml += returnCustomElement(
            event.data.tmpId,
            "",
            element,
            str,
            event.data.keys.option_id[i],
            selected,
            event.data.keys.option_desc[i]
          );
        }
      }
    }
    var descriptionHtml = Tooltip("text", selectObject.questionText);
    if (
      !isImageVidEnq(event.data.tmpId) &&
      ReqObj.Form[event.data.tmpId].FormSequence.StepCounter > 0 &&
      selectObject.questionText !== ""
    ) {
      selectObject["lblClass"] + " bedbtip";
    }
    var OtherIpField = "";
    var OtherBoxAnswer = "";
    if (selectObject["onchange"]) {
      var OtherClasses = "be-slbox beisq-tbx be-othr othrwd inpt_errorbx";
      var OtherBoxAnswer =
        !selBoxPrefilled && notEmpty(event.data.keys.prefilledAns[0])
          ? event.data.keys.prefilledAns[0]
          : "";
      var OtherSelected = notEmpty(OtherBoxAnswer) ? "selected" : "";
      OtherClasses = !notEmpty(OtherBoxAnswer)
        ? OtherClasses + " bedsnone"
        : OtherClasses;
      // var OtherIpField = "<input type = 'text' id = 'other_" + "t" + event.data.tmpId + "select_name" + ReqObj.Form[event.data.tmpId].questionCount + "_1' class='" + OtherClasses + "' value ='" + OtherBoxAnswer + "'/>";
  
      var OtherIpField = isBlInline(tmpId)
        ? "<input type = 'text' id = 'other_" +
          "t" +
          event.data.tmpId +
          "select_name" +
          ReqObj.Form[event.data.tmpId].questionCount +
          "_1' class= bedsnone'" +
          OtherClasses +
          "' value ='" +
          OtherBoxAnswer +
          "'/>"
        : "<input type = 'text' id = 'other_" +
          "t" +
          event.data.tmpId +
          "select_name" +
          ReqObj.Form[event.data.tmpId].questionCount +
          "_1' class= '" +
          OtherClasses +
          "' value ='" +
          OtherBoxAnswer +
          "'/>";
      // box changes
  
      var element = IsChatbl(event.data.tmpId) ? "li" : "option";
      optionHtml += returnCustomElement(
        event.data.tmpId,
        "",
        element,
        OtherOptionVal,
        OtherOptionId,
        OtherSelected,
        OtherOptionDesc
      );
      QuestionObject["others"].push(
        "#other_" +
          "t" +
          event.data.tmpId +
          "select_name" +
          ReqObj.Form[event.data.tmpId].questionCount +
          "_1"
      );
    }
    var element = IsChatbl(event.data.tmpId) ? "ul" : "select";
    var popupChatUserInput =
      chatBlSpecificObject["chatblOuterdiv"] +
      chatBlSpecificObject["readonly"] +
      chatBlSpecificObject["arrow"] +
      "<div class='cbl_sclBr cbl_pa dn'>" +
      SelectBoxIp(selectObject, event.data.tmpId) +
      optionHtml +
      "</" +
      element +
      ">" +
      OtherIpField +
      chatBlSpecificObject["chatblClosingdiv"] +
      chatBlSpecificObject["chatblClosingdiv"];
    var lblClass = "lbtool";
    selectObject["lblin"] = true;
    if (
      isImageVidEnq(event.data.tmpId) &&
      ReqObj.Form[event.data.tmpId].FormSequence.StepCounter < 1
    ) {
      lblClass = "";
      selectObject["lblin"] = false;
    }
    typeSelectHtmlObj["OuterWrapper"] =
      isSSB(event.data.tmpId) || isBlInline(event.data.tmpId)
        ? ""
        : "<div class='" + selectObject.divClass + "'>";
    typeSelectHtmlObj["Label"] =
      isSSB(event.data.tmpId) || isBlInline(event.data.tmpId)
        ? MakeLabel(selectObject, descriptionHtml, event.data.tmpId)
        : "<div class='" +
          lblClass +
          "'>" +
          MakeLabel(selectObject, descriptionHtml, event.data.tmpId) +
          "</div>";
    typeSelectHtmlObj["ClosingWrapper"] = isSSB(event.data.tmpId) ? "" : "</div>";
    // typeSelectHtmlObj["UserInput"] = (IsChatbl(event.data.tmpId)) ? popupChatUserInput : SelectBoxIp(selectObject, event.data.tmpId) + optionHtml + "</" + element + ">" + OtherIpField;
    if (isBlInline(tmpId)) {
      typeSelectHtmlObj["UserInput"] = IsChatbl(event.data.tmpId)
        ? popupChatUserInput
        : SelectBoxIp(selectObject, event.data.tmpId) +
          optionHtml +
          "</" +
          element +
          ">";
    } else {
      typeSelectHtmlObj["UserInput"] = IsChatbl(event.data.tmpId)
        ? popupChatUserInput
        : SelectBoxIp(selectObject, event.data.tmpId) +
          optionHtml +
          "</" +
          element +
          ">" +
          OtherIpField;
    }
    ReqObj.Form[event.data.tmpId].Isq.Question.push(QuestionObject);
    if (
      isSSB(event.data.tmpId) &&
      selectObject.QuestionDesc.toLowerCase() === "currency"
    ) {
      typeSelectHtmlObj["UserInput"] =
        "<div>" +
        typeSelectHtmlObj["UserInput"] +
        " <div class = 'mb-ertxt mb-mt10' id = 't" +
        event.data.tmpId +
        "_curr_err'> </div></div>";
    }
    return typeSelectHtmlObj;
  }
  /* ---------------------------------------------------TYPE : CheckBox ---------------------------------------------------- */
  
  function typeCheckBox(event) {
    var QuestionObject = returnIsqQuestionObject({
      data: {
        type: "CHECKBOX",
        questionText: event.data.IsqObj.IM_SPEC_MASTER_DESC,
        questionId: isSet(event.data.IsqObj.IM_SPEC_MASTER_ID)
          ? event.data.IsqObj.IM_SPEC_MASTER_ID
          : "",
        optionSelector: "",
        others: [],
      },
    });
    var CheckboxObject = returnIsqHtmlObject(event, QuestionObject);
    // ReqObj.Form[event?.data?.tmpId].isNewImage=="1" && (CheckboxObject["lblClass"] = " be-lbl"); js error Unexpected token '.'
    isSet(ReqObj.Form[event.data.tmpId].isNewImage) &&
      ReqObj.Form[event.data.tmpId].isNewImage == "1" &&
      (CheckboxObject["lblClass"] = " be-lbl");
    var descriptionHtml = Tooltip(
      "check",
      event.data.IsqObj.IM_SPEC_MASTER_FULL_DESC
    );
    var type4HtmlObj = {
      OuterWrapper: "",
      Label: isSSB(event.data.tmpId)
        ? LabelForCheckAndRadio(
            CheckboxObject,
            descriptionHtml,
            event.data.tmpId,
            ""
          )
        : "<div class='lbtool'>" +
          LabelForCheckAndRadio(
            CheckboxObject,
            descriptionHtml,
            event.data.tmpId,
            ""
          ) +
          "</div>",
      ClosingWrapper: "",
    };
    var closedivcls = isSSB(event.data.tmpId)
      ? isnewSSB(event.data.tmpId)
        ? "nb-flex nb-aic nb-flwp nb-mt10"
        : "mb-flex"
      : isBlInline(event.data.tmpId)
      ? "iwChk"
      : "bemgb15 nwDt";
    type4HtmlObj["UserInput"] = IsChatbl(event.data.tmpId)
      ? ""
      : "<div class='" + closedivcls + "'>";
    QuestionObject.optionSelector =
      "input[name='" +
      "t" +
      event.data.tmpId +
      "checkbox_name" +
      ReqObj.Form[event.data.tmpId].questionCount +
      "']";
    type4HtmlObj["UserInput"] += !IsChatbl(event.data.tmpId)
      ? ""
      : "<div class = 'cbl_radio'>";
  
    if (isSet(event.data.keys.option_desc)) {
      for (var i = 0; i < event.data.keys.option_desc.length; i++) {
        var indexofAns = -1;
        if (event.data.keys.prefilledAns.length > 0) {
          var optionDesc = event.data.keys.option_desc[i];
          if (isSet(optionDesc)) {
            optionDesc = trimVal(optionDesc);
          }
          indexofAns = $.inArray(optionDesc, event.data.keys.prefilledAns);
          if (indexofAns !== -1)
            event.data.keys.prefilledAns.splice(indexofAns, 1);
        }
  
        if (
          event.data.keys.option_desc[i].trim().toLowerCase() === "others" ||
          event.data.keys.option_desc[i].trim().toLowerCase() === "other"
        ) {
          QuestionObject["others"].push(
            "#" +
              "t" +
              event.data.tmpId +
              "other_checkbox_name" +
              ReqObj.Form[event.data.tmpId].questionCount +
              "_option" +
              (i + 1)
          );
          var OthersBoxObject = {
            divClass: isSSB(event.data.tmpId)
              ? isnewSSB(event.data.tmpId)
                ? "nb-pr15"
                : ""
              : "be-chckbox oth_bx other_check",
            optionId: event.data.keys.IsOptionIdEmpty
              ? event.data.keys.option_id[i]
              : "",
            inputName:
              "t" +
              event.data.tmpId +
              "other_checkbox_name" +
              ReqObj.Form[event.data.tmpId].questionCount,
            inputId:
              "t" +
              event.data.tmpId +
              "other_checkbox_name" +
              ReqObj.Form[event.data.tmpId].questionCount +
              "_option" +
              (i + 1),
            ans: "",
          };
          if (indexofAns === -1)
            OthersBoxObject["ans"] = event.data.keys.prefilledAns;
          type4HtmlObj["UserInput"] += OthersBox(
            OthersBoxObject,
            event.data.tmpId
          );
        } else {
          var CheckBoxObject = {
            option_id: event.data.keys.IsOptionIdEmpty
              ? event.data.keys.option_id[i]
              : "",
            templateId: "t" + event.data.tmpId,
            questionCount: ReqObj.Form[event.data.tmpId].questionCount,
            option_desc: event.data.keys.option_desc[i],
            i: i,
          };
          CheckBoxObject["inputClass"] = IsChatbl(event.data.tmpId)
            ? "cbl_chekbx_btn"
            : "bevT bedblk";
          CheckBoxObject["labelClass"] = IsChatbl(event.data.tmpId)
            ? "cbl_chekbx_label CheckboxClick"
            : isSSB(event.data.tmpId)
            ? "CheckboxClick"
            : "bepr CheckboxClick";
  
          if (indexofAns !== -1) {
            CheckBoxObject["divClass1"] = isOtherEnq(event.data.tmpId)
              ? "be-chckbox sl-box chksl eqchkbx"
              : "be-chckbox sl-box chksl";
            CheckBoxObject["divClass2"] = "betick-sl";
            CheckBoxObject["checked"] = "checked";
            CheckBoxObject["spanClass"] =
              IsChatbl(event.data.tmpId) || isSSB(event.data.tmpId)
                ? ""
                : "bevT bedblk beisq3 w-txt";
          } else {
            CheckBoxObject["divClass1"] = IsChatbl(event.data.tmpId)
              ? "cbl_chekbx cbl_df cbl_aic cbl_ml20"
              : isSSB(event.data.tmpId)
              ? isnewSSB(event.data.tmpId)
                ? "nb-chk nb-pr nb-dib nb-pr15"
                : "mb-chk mb-pr mb-dib"
              : isOtherEnq(event.data.tmpId)
              ? "be-chckbox eqchkbx"
              : (pdpInactiveBL(event.data.tmpId)) ? "be-chckbox cbl_br10" : "be-chckbox";
            CheckBoxObject["divClass2"] = "betick-sl bedsnone";
            CheckBoxObject["checked"] = "";
            CheckBoxObject["spanClass"] =
              IsChatbl(event.data.tmpId) || isSSB(event.data.tmpId)
                ? ""
                : "bevT bedblk beisq3";
          }
          type4HtmlObj["UserInput"] += CheckBox(event.data.tmpId, CheckBoxObject);
        }
      }
    }
    type4HtmlObj["UserInput"] +=
      IsChatbl(event.data.tmpId) || isSSB(event.data.tmpId) ? "</div>" : "";
    // changes for ssb (single page)
    if (isSet(OthersBoxObject) && isSet(OthersBoxObject["inputId"])) {
      var html = "";
      html += returnContainer(
        OthersBoxObject["inputId"],
        "_err",
        "texterr bedsnone",
        "",
        ""
      );
      html += returnContainer(
        OthersBoxObject["inputId"],
        "_errmsg",
        "",
        "content",
        ""
      );
      html += "</div>Please enter valid input</div>";
      type4HtmlObj["UserInput"] = type4HtmlObj["UserInput"] + "</div>" + html;
    }
    ReqObj.Form[event.data.tmpId].Isq.Question.push(QuestionObject);
    return type4HtmlObj;
  }
  
  /* -------------------------------------------- TYPE : Quantity & Unit ------------------------------------------------------- */
  
  function typeQuantity(event) {
    var QuestionObject = returnIsqQuestionObject({
      data: {
        type: "TEXTBOX",
        questionText: event.data.IsqObj.IM_SPEC_MASTER_DESC,
        questionId: isSet(event.data.IsqObj.IM_SPEC_MASTER_ID)
          ? event.data.IsqObj.IM_SPEC_MASTER_ID
          : "",
        optionSelector: "",
        others: [],
      },
    });
    event.data.IsqObj.IM_SPEC_MASTER_DESC.toLowerCase() === "quantity unit"
      ? DescMapWithId(
          event.data.tmpId,
          event.data.keys.option_desc,
          event.data.keys.option_id
        )
      : "";
    if (event.data.keys.type === "ut") {
      ReqObj.Form[event.data.tmpId].qutAnswers =
        event.data.IsqObj.IM_SPEC_OPTIONS_DESC.split("##");
    }
    var firstqut =
      isImageVidEnq(event.data.tmpId) &&
      ReqObj.Form[event.data.tmpId].FormSequence.StepCounter < 1
        ? true
        : false;
    if (
      (isImageVidEnq(event.data.tmpId) &&
        ReqObj.Form[event.data.tmpId].FormSequence.StepCounter > 0 &&
        isSet(ReqObj.Form[event.data.tmpId].isQtutShown) &&
        ReqObj.Form[event.data.tmpId].isQtutShown === true &&
        (event.data.keys.type === "ut" || event.data.keys.type === "qt")) ||
      (isSet(ReqObj.Form[event.data.tmpId].isBlQtutShown) &&
        ReqObj.Form[event.data.tmpId].isBlQtutShown)
    ) {
      event.data.tmpId.substr(0, 2) === "01" ||
      event.data.tmpId.substr(0, 2) === "04"
        ? (ReqObj.Form[event.data.tmpId].stopper += 1)
        : ""; //ff_here
      return returnEmptyObject();
    }
    var screen_no =
      event.data.tmpId.substr(0, 2) === "09" &&
      ReqObj.Form[event.data.tmpId].formType.toLowerCase() === "bl"
        ? ReqObj.Form[event.data.tmpId].FormSequence.StepCounter + 1
        : "";
    var iden_class =
      screen_no !== ""
        ? "qtut" + event.data.tmpId + "_" + screen_no
        : "qtut" + event.data.tmpId;
    var unsugg_class =
      screen_no !== ""
        ? "unsug" + event.data.tmpId + "_" + screen_no
        : "unsug" + event.data.tmpId;
  
    var brdlft =(pdpInactiveBL(event.data.tmpId)) ? " brdlft8" : "";
    var brdrgt =(pdpInactiveBL(event.data.tmpId)) ? " brdrgt8" : "";
  
    var textboxObject = {
      // to return html
      labelId:
        "t" +
        event.data.tmpId +
        "ques" +
        ReqObj.Form[event.data.tmpId].questionCount,
      questionId: QuestionObject.questionId,
      optionId: event.data.keys.IsOptionIdEmpty
        ? event.data.keys.option_id[0]
        : false,
      QuestionDesc: QuestionObject.questionText,
      inputId:
        "t" +
        event.data.tmpId +
        "txtbx_option" +
        ReqObj.Form[event.data.tmpId].questionCount +
        screen_no,
      inputName:
        "t" +
        event.data.tmpId +
        "text_name" +
        ReqObj.Form[event.data.tmpId].questionCount +
        screen_no,
      ans: event.data.keys.prefilledAns,
  
      //ff_here 3line
      placeholder: IsChatbl(event.data.tmpId)
        ? " Enter " + QuestionObject.questionText
        : isBlFirstfold(event.data.tmpId)
        ? QuestionObject.questionText
        : firstqut === true && event.data.keys.type === "qt"
        ? ""
        : "",
  
      // lblClass: (event.data.keys.type === "qt") ? (isSSB(event.data.tmpId)) ? ssbClass("label", event.data.tmpId) : "qt_lbl" : "",
  
      lblClass:
        event.data.keys.type === "qt"
          ? isSSB(event.data.tmpId)
            ? ssbClass("label", event.data.tmpId)
            : isBlFirstfold(event.data.tmpId)
            ? "be-lbl dn"
            : "qt_lbl"
          : "",
  
      divClass:
        event.data.keys.type === "qt" ? "bepr isq-st19" : "bedblk bepr be-w50",
      inputClass:
        event.data.keys.type === "qt"
          ? "be-input in_cus " + iden_class + brdlft
          : "be-input " + unsugg_class + " inut_cus" + brdrgt,
      maxlength: event.data.keys.type === "qt" ? "12" : "1000",
      type: event.data.keys.type,
    };
    textboxObject.inputClass +=
      IsChatbl(event.data.tmpId) && event.data.keys.type === "qt"
        ? " cbl_qtut"
        : "";
    textboxObject.ans =
      event.data.keys.type === "qt" && !isAllNumbers(textboxObject.ans[0])
        ? ""
        : textboxObject.ans;
    if (event.data.keys.type === "qt" && textboxObject.ans !== "") {
      updateQtKey(event.data.tmpId, "prefilled");
      textboxObject.ans = textboxObject.ans[0].substring(0, 12);
    }
    textboxObject["inputClass"] =
      event.data.keys.type === "qt" &&
      isImageVidEnq(event.data.tmpId) &&
      ReqObj.Form[event.data.tmpId].FormSequence.StepCounter < 1
        ? textboxObject["inputClass"] + " imgoneqty"
        : textboxObject["inputClass"];
    QuestionObject.optionSelector =
      "input[name='" + textboxObject.inputName + "']";
    var addvalue = event.data.keys.type === "ut" ? true : false;
    if (event.data.IsqObj.IM_CAT_SPEC_CATEGORY_TYPE === "2") addvalue = false;
    textboxObject["optionId"] =
      addvalue && isSet(textboxObject.ans) && textboxObject.ans != ""
        ? getOptionId(event.data.tmpId, textboxObject.ans[0])
        : textboxObject["optionId"];
    var error_div =
      event.data.keys.type === "qt"
        ? screen_no !== ""
          ? '<div id="t' +
            event.data.tmpId +
            "_" +
            screen_no +
            '_validinev"' +
            screen_no +
            ' class="bedsnone" value=""></div>'
          : '<div id="t' +
            event.data.tmpId +
            '_validinev"' +
            screen_no +
            ' class="bedsnone" value=""></div>'
        : "";
    var typetextHtmlObj = {
      OuterWrapper: "<div class='" + textboxObject.divClass + "'>",
      beforeLabel: "",
      Label: "",
      beforeInput: "",
      UserInput: TextBoxIp(textboxObject, false, addvalue),
      ClosingWrapper: "</div>",
      qtuttype: event.data.keys.type === "ut" ? 6 : 5,
      error_div: error_div,
      label_div:
        firstqut === true
          ? ""
          : "<label id='" +
            textboxObject.labelId +
            "' class='" +
            textboxObject.lblClass +
            "'>" +
            textboxObject.QuestionDesc +
            "</label>",
    };
    ReqObj.Form[event.data.tmpId].Isq.Question.push(QuestionObject);
    ReqObj.Form[event.data.tmpId].isQtutShown =
      event.data.keys.type === "ut" &&
      isImageVidEnq(event.data.tmpId) &&
      ReqObj.Form[event.data.tmpId].FormSequence.StepCounter < 1
        ? true
        : ReqObj.Form[event.data.tmpId].isQtutShown;
    ReqObj.Form[event.data.tmpId].qtUtQuesPresent = true;
    if (
      (isBlInline(event.data.tmpId) || isBlFirstfold(event.data.tmpId)) &&
      event.data.keys.type === "ut"
    )
      //ff_here
      ReqObj.Form[event.data.tmpId].isBlQtutShown = true;
    return typetextHtmlObj;
  }
  
  /*--------------------------------------------------------------------------------------------------------------------- */
  /*----------- City Suggester for location ISQ  -------------*/
  function citySugg(tmpId, id) {
    var iso = currentISO();
    if (typeof Suggester === "undefined") {
      setTimeout(function () {
        citySugg(tmpId);
      }, 50);
    } else {
      if (typeof Suggester !== "undefined") {
        var CitySuggSuffix = "_citySugg";
        var row_num = BlAutoSuggRowNum(tmpId);
        var autocompleteClass = SetAutoCompleteClass(tmpId, CitySuggSuffix);
        if (IsChatBLInline(tmpId)) autocompleteClass += " smChtSg";
        main_city_sugg = new Suggester({
          element: id,
          onSelect: "",
          type: "city",
          fields: "std,state,id,stateid",
          minStringLengthToDisplaySuggestion: 1,
          rowsToDisplay: row_num,
          autocompleteClass: autocompleteClass,
          displayFields: "value,state",
          displaySeparator: " >> ",
          filters: "iso:" + iso,
          recentData: false,
          rowsToDisplay: IsChatBLInline(tmpId) ? 3 : "",
        });
      }
    }
  }
  function returnIsqQuestionObject(event) {
    return {
      type: event.data.type,
      questionText: event.data.questionText,
      questionId: event.data.questionId,
      optionSelector: event.data.optionSelector,
      others: event.data.others,
    };
  }
  
  function returnIsqHtmlObject(event, QuestionObject) {
    return {
      labelId:
        "t" +
        event.data.tmpId +
        "ques" +
        ReqObj.Form[event.data.tmpId].questionCount,
      questionId: QuestionObject.questionId,
      QuestionDesc: QuestionObject.questionText,
      type: QuestionObject.type,
    };
  }
  
  function handleSpecialQuotes(str) {
    if (typeof str !== "undefined" && str !== "") {
      if (str.indexOf("'") > 0) {
        str = str.replace(/'/g, "&#39");
      } else if (str.indexOf('"') > 0) {
        str = str.replace(/"/g, "&quot");
      }
      return str;
    }
    return "";
  }
  
  var webAddressLocation = location.hostname;
  var appsServerName = webAddressLocation.match(/^dev/)
    ? "//dev-apps.imimg.com/"
    : webAddressLocation.match(/^stg/)
    ? "//stg-apps.imimg.com/"
    : "//apps.imimg.com/";
  
  function notEmpty(val) {
    if (isSet(val) && val !== "") {
      return true;
    } else return false;
  }
  
  function isFirstImgVidCTA(tmpId) {
    return isImageVidEnq(tmpId) &&
      ((ReqObj.Form[tmpId].FormSequence.StepCounter < 1 && imeshExist() === "") ||
        (Enq09(tmpId) &&
          imeshExist() &&
          NEC() &&
          ReqObj.Form[tmpId].FormSequence._stepCounter < 1))
      ? true
      : false;
  }
  function isFirstImgVidCTAFR(tmpId) {
    return isImageVidEnq(tmpId) &&
      ReqObj.Form[tmpId].FormSequence.StepCounter < 1 &&
      (imeshExist() === "" || currentISO() !== "IN")
      ? true
      : false;
  }
  
  function returnSubmitInnerHtml(tmpId) {
    var html = returnContainer(
      "t" + tmpId,
      "_fBtn",
      "bepr eqClearfx",
      "",
      "",
      ""
    );
    html +=
      "<div class='backdiv bedsnone' id='t" +
      tmpId +
      "_backdiv'><input value='' class='be-backbtn' id='t" +
      tmpId +
      "_be-backbtn' type='submit'><div id='t" +
      tmpId +
      "_backarr'></div></div><div class='' id='t" +
      tmpId +
      "_submitdiv'><input value='Next' class='form-btn' id='t" +
      tmpId +
      "_submit' type='submit' style='background-color: #00a699'></div>";
    html += "</div>";
  
    if (pdpInactiveBL(tmpId)) {
      $("#t" + tmpId, "_fBtn").css({
        "margin-right": "25%",
      });
    }
    return html;
  }
  
  function getMcatImage(tmpId, cbObj, left) {
    if (
      isSet(tmpId) &&
      isSet(ReqObj.Form[tmpId]) &&
      isSet(ReqObj.Form[tmpId].formType)
    ) {
      if (
        isSet(ReqObj.Form[tmpId].mcatId) &&
        parseInt(ReqObj.Form[tmpId].mcatId) > -1 &&
        isSet(ReqObj.Form[tmpId].modId) &&
        ReqObj.Form[tmpId].modId !== -1 &&
        ReqObj.Form[tmpId].modId !== ""
      ) {
        $("#t" + tmpId + "_imglodr").removeClass("bedsnone");
        ReqObj.Form[tmpId].displayImage =
          isSet(ReqObj.Form[tmpId].displayImage) &&
          ReqObj.Form[tmpId].displayImage === ""
            ? ""
            : ReqObj.Form[tmpId].displayImage;
        ReqObj.Form[tmpId].zoomImage = "";
        ReqObj.mcatImage = "";
        ReqObj.mcatdtl.ping = true;
        fireAjaxRequest({
          data: {
            ga: {
              s: false,
              f: true,
              gatype: "McatDtl",
              source: "",
            },
            tmpId: tmpId,
            ajaxObj: {
              obj: "",
              s: {
                ss: 0,
                sf: {
                  af: 0,
                  pa: 0,
                },
                f: 0,
              },
              f: {
                f: 0,
              },
            },
            ajaxtimeout: 3000,
            ajaxdata: {
              modid: ReqObj.Form[tmpId].modId,
              mcatid: parseInt(ReqObj.Form[tmpId].mcatId),
            },
            hitfinserv: "",
            type: 9,
            key: {
              cbObj: cbObj,
              left: left,
            },
          },
        });
      }
    }
  }
  
  function ShowOtp(tmpId) {
    var imeshcookie = imeshExist();
    if (
      imeshcookie &&
      usercookie.getParameterValue(imeshcookie, "uv") !== "V" &&
      usercookie.getParameterValue(imeshcookie, "iso") === "IN"
    )
      return true;
    else return false;
  }
  function toAddSkipOtp(tmpId, message) {
    return checkblockedUser()
      ? false
      : (isEnq(tmpId) &&
          (isSecondEnq() === false || (message === "" && isSecondEnq()))) ||
        (isBl(tmpId) &&
          (isSecondBl() === false || (message === "" && isSecondBl())))
      ? true
      : false;
  }
  
  function ObjectTrim(object) {
    var trimmedObject = {};
    for (var key in object) {
      if (typeof object[key] === "string") object[key] = object[key].trim();
      if (object[key] !== "") trimmedObject[key] = object[key];
    }
    return trimmedObject;
  }
  
  /*
   * @description this method is used to check if localstorage exists
   *
   *
   * @returns true if localStorage exists else false
   */
  function CheckLocalStorage() {
    try {
      localStorage.setItem("__checklocalstorage", "exists");
      localStorage.removeItem("__checklocalstorage");
      return true;
    } catch (exception) {
      return false;
    }
  }
  
  /*
   * maybe class not required
   * Class     : LoginFlag
   * Usage     : returns the login flag.
   *
   * @function : returnLoginFlag - returns the login flag
   */
  function LoginFlag() {}
  LoginFlag.prototype.returnLoginFlag = function (todo) {
    if (todo === "glusrupdate" && todo !== "") return 2;
    if (todo === "verifyusr" && todo !== "") return 5;
    if (todo === "login" && todo !== "") return 1;
    if (todo === "blurlogin" && todo !== "") return 3;
  };
  
  /*
   * Class     : LoginMode
   * Usage     : returns the login mode
   *
   * @function : cookies      - read required cookies
   * @function : getLoginMode - return login mode
   */
  function LoginMode() {}
  LoginMode.prototype.getLoginMode = function () {
    var v4iilexCookie = usercookie.getCookie("v4iilex");
    var imissCookie = usercookie.getCookie("im_iss");
    var imEqGlCookie = usercookie.getCookie("imEqGl");
    var imeshCookie = imeshExist();
    var loginmode = 0;
    if (imeshCookie === "" && v4iilexCookie !== "") {
      usercookie.deleteCookie("v4iilex"); /* */
      v4iilexCookie = "";
    }
    if (imeshCookie === "" && imEqGlCookie !== "") {
      /* logout kiya user ne and for mozilla*/
      usercookie.deleteCookie("imEqGl");
    }
  
    if (isSet(imissCookie) && imissCookie !== "") {
      /* when v4iilex cookie is set */
      loginmode = 1;
    } else if (isSet(imeshCookie) && imeshCookie !== "") {
      /* when imesh cookie is set */
      loginmode = 2;
    } else loginmode = 3; //new user /* nothing is set */
  
    return loginmode;
  };
  /*
   * Usage : to check for European Countries
   *
   */
  
  // function isEuroCountry(country_iso) {
  //   var len = isSet(global_euroArr) ? global_euroArr.length : 0;
  //   for (var i = 0; i < len; i++) {
  //     if (global_euroArr[i] === country_iso)
  //       return true;
  //   }
  //   return false;
  // }
  /*
   * Usage :
   */
  
  /*
   * Usage : To move to next fieldbfbfdbdfbdbd
   */
  function movetoNext(event) {
    var tmpId = event.data.tmpId;
    if ($("#t" + tmpId + event.data.param1).val() !== "") {
      $("#t" + tmpId + event.data.param2).focus();
    }
  }
  /*
   * Usage : To move to previous field
   */
  function movetoPrevious(event) {
    var tmpId = event.data.tmpId;
    if (event.keyCode == 8) {
      if ($("#t" + tmpId + event.data.param1).val() === "") {
        $("#t" + tmpId + event.data.param2).focus();
        $("#t" + tmpId + event.data.param2).html("");
      }
    }
  }
  /*
   * Usage : String to Key,Value pairs
   */
  function stringToObject(query, seperator) /* a or b required ? */ {
    var query_arr = query.split(seperator);
    var len = isSet(query_arr) ? query_arr.length : 0;
    var obj = {};
    for (var i = 0; i < len; i++) {
      var sub_query_arr = query_arr[i].split("=");
      obj[sub_query_arr[0]] = sub_query_arr[1];
    }
    return obj;
  }
  
  /*
   *  Change and check tracking
   */
  
  
  
  function imInvokeRequestForGaCode(tmpId, eventAction) {
    //<!--google analytics async code start-->
    // var script = trackScript;
    // _gaq.push(['_trackPageview', script]);
    //<!--google analytics async code end-->
    // if(ReqObj.Form[tmpId].toFireGaTracking === true){
    var form_type =
      ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
    var imeshcookie = imeshExist();
  
    var virtualPageURL =
      "/cgi/" +
      ReqObj.Form[tmpId].modId +
      "/" +
      form_type +
      "/" +
      getEventLabel();
    virtualPageURL += imeshcookie === "" ? "-new.mp" : ".mp";
  
    imgtm.push({
      event: "VirtualPageview",
      virtualPageURL: virtualPageURL,
      virtualPageTitle: "Send Enquiry -" + eventAction,
      CD_Additional_Data: ReqObj.Form[tmpId].refText,
    });
    ReqObj.Form[tmpId].pvTrackingFired = true;
    // }
  }
  
  
  function labelNEC(iso) {
    var nec = "";
    if (isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn !== "") nec += "N";
    if (iso === "IN") {
      if (ReqObj.UserDetail.em !== "") nec += "E";
      if (ReqObj.UserDetail.ctid !== "") nec += "C";
      if (nec === "") nec = "NO-NEC";
    } else {
      if (ReqObj.UserDetail.mb1 !== "") nec += "M";
      if (nec === "") nec = "NO-NM";
    }
    return nec;
  }
  
  
  
  /* no idea about this */
  function ServiceGATrack(TracName, TracEvent, FileName) {
    if (isSet(_gaq)) {
      _gaq.push(["_trackEvent", TracName, TracEvent, FileName, 0, true]);
    }
  }
  
  
  
  function UpdateAfterLogin(key) {
    if (usercookie.getParameterValue(imeshExist(), key) !== "") {
      ReqObj.UserDetail[key] = setDetail(key);
    }
  }
  
  function isGDPRCountry() {
    var GdprCountries = [
      "AT",
      "BE",
      "BG",
      "HR",
      "CY",
      "CZ",
      "DK",
      "EE",
      "FI",
      "FR",
      "DE",
      "GR",
      "HU",
      "IE",
      "IT",
      "LV",
      "LT",
      "LU",
      "MT",
      "NL",
      "PL",
      "PT",
      "RO",
      "SK",
      "SI",
      "ES",
      "SE",
      "GB",
      "UK",
    ];
    if ($.inArray(currentISO(), GdprCountries) !== -1) return true;
    return false;
  }
  /*--------------------To show Tnc-------------------- */
  function toShowTnc(tmpId) {
    if (imeshExist() === "") {
      return isGDPRCountry() === true ? true : false;
    }
    return false;
  }
  /*--------------------Hov - onSubmit Tnc-------------------- */
  function onHovSub(tmpId) {
    var isGDPR = isGDPRCountry();
    if (currentISO() !== "IN") {
      if (isGDPR === true) {
        isSet(ReqObj.Form[tmpId].IsCheckboxChecked) &&
        ReqObj.Form[tmpId].IsCheckboxChecked === true
          ? $("#t" + tmpId + "_submit").addClass("hovsub")
          : $("#t" + tmpId + "_submit").removeClass("hovsub");
      } else $("#t" + tmpId + "_submit").addClass("hovsub");
    } else $("#t" + tmpId + "_submit").addClass("hovsub");
  }
  /*--------------------Checked Tnc-------------------- */
  function checkedTNC(tmpId) {
    if (isSet(tmpId) && isSet(ReqObj.Form[tmpId])) {
      if ($("#t" + tmpId + "_tCondCheckBox").prop("checked")) {
        ReqObj.Form[tmpId].IsCheckboxChecked = true;
        $("#t" + tmpId + "_error_tCond")
          .text("Please agree to the terms and conditions")
          .addClass("bedsnone");
        submitTncUI(tmpId, 1);
      } else {
        ReqObj.Form[tmpId].IsCheckboxChecked = false;
        submitTncUI(tmpId, 0);
      }
      onHovSub(tmpId);
    }
  }
  /*--------------------To show or hide-------------------- */
  function ShowHideTNC(tmpId) {
    toShowTnc() === true ? ShowTncBox(tmpId) : HideTncBox(tmpId);
  }
  /*--------------------To show-------------------- */
  function ShowTncBox(tmpId) {
    if (IsChatBLInline(tmpId)) {
      if (toShowTnc(tmpId) && $("#t" + tmpId + "verify_error").is(":visible"))
        $("#t" + tmpId + "_tCond").addClass("bt142");
    }
    $("#t" + tmpId + "_tCond").removeClass("bedsnone");
    if (Enq09(tmpId)) {
      $("#t" + tmpId + "_tCond").addClass("pd_b");
      if(direnqImage(tmpId)){
        $("#t" + tmpId + "_tCond").addClass("pdtop");
      }
      if (isMoglixUi(tmpId)) $("#t" + tmpId + "_tCond").addClass("bemt10");
    }
    if (Bl01(tmpId)) $("#t" + tmpId + "_tCond").addClass("bemb5");
    $("#t" + tmpId + "_tCondCheckBox").prop("checked", false);
    if (isBlInlineFr(tmpId)) {
      $("#t" + tmpId + "_tCond").addClass("mar_bemb"); //adwords_ch
      $("#t" + tmpId + "_tCond").removeClass("bemt10");
    }
    submitTncUI(tmpId, 0);
  }
  /*--------------------To hide-------------------- */
  function HideTncBox(tmpId) {
    $("#t" + tmpId + "_tCond").addClass("bedsnone");
    $("#t" + tmpId + "_tCondCheckBox").prop("checked", true);
    submitTncUI(tmpId, 1);
  }
  /*--------------------UI- show/hide-------------------- */
  function submitTncUI(tmpId, todo) {
    var dv = isEcomProduct(tmpId) ? false : todo === 0 ? true : false;
    var dc = isEcomProduct(tmpId)
      ? "#00a699"
      : todo === 0
      ? "#b2b2b2"
      : "#00a699";
    $("#t" + tmpId + "_submit").prop("disabled", dv);
    if (isImageVidEnq(tmpId) || isMoglixUi(tmpId)) {
      isEcomProduct(tmpId)
        ? $("#t" + tmpId + "_submit").removeAttr("style")
        : todo === 0
        ? $("#t" + tmpId + "_submit")
            .prop("disabled", dv)
            .attr("style", "background:" + dc + "; box-shadow:none")
        : $("#t" + tmpId + "_submit").removeAttr("style");
    } else if (!IsChatbl(tmpId))
      (isSSB(tmpId) || (isGlIdEven(tmpId) && tmpId.substr(0, 2) === "01")) && !dv
        ? $("#t" + tmpId + "_submit")
            .prop("disabled", false)
            .attr("style", "")
        : $("#t" + tmpId + "_submit")
            .prop("disabled", false)
            .css("background-color", dc);
    else {
      if (todo === 1) $(".cbl_sbmt_btn").removeClass("cbl_dsbl");
      else {
        $(".cbl_error").addClass("cbl_frnerr"); // popup
        $(".cbl_sbmt_btn").addClass("cbl_dsbl");
      }
    }
  }
  
  function toShowOtpFlagCondition(tmpId) {
    if (ReqObj.Form[tmpId].formType.toLowerCase() === "bl" || IsChatbl(tmpId)) {
      return (
        isSet(ReqObj.Form[tmpId].toShowOtpStepbl) &&
        ReqObj.Form[tmpId].toShowOtpStepbl !== false
      );
    } else if (ReqObj.Form[tmpId].formType.toLowerCase() === "enq") {
      return (
        isSet(ReqObj.Form[tmpId].toShowOtpStepenq) &&
        ReqObj.Form[tmpId].toShowOtpStepenq !== false
      );
    }
  }
  
  function disableEnquiryButton(tmpId) {
    if (typeof ReqObj.Form[tmpId].enqSentCallBack === "function") {
      var value =
        isSet(ReqObj.Form[tmpId].enquiryDivID) &&
        ReqObj.Form[tmpId].enquiryDivID !== ""
          ? ReqObj.Form[tmpId].enquiryDivID
          : "dispid" + ReqObj.Form[tmpId].pDispId;
  
      var passVal = ReturntoProp(tmpId);
      ReqObj.Form[tmpId].enqSentCallBack(passVal);
    }
  }
  
  function appendImEqGlCookie(tmpId, createstep) {
    if (isSet(tmpId)) {
      ReqObj.Form[tmpId].toShowOtpStep =
        isSet(createstep) && createstep === "firsttimecreation" ? false : true;
      var value = "";
      if (
        isSet(ReqObj.Form[tmpId].formType) &&
        ReqObj.Form[tmpId].formType.toLowerCase() === "enq"
      ) {
        value =
          isSet(ReqObj.Form[tmpId].enquiryDivID) &&
          ReqObj.Form[tmpId].enquiryDivID !== ""
            ? ReqObj.Form[tmpId].enquiryDivID
            : "dispid" + ReqObj.Form[tmpId].pDispId;
      } else {
        value = "BL" + usercookie.getParameterValue(imeshExist(), "glid");
      }
  
      if (isSet(value) && value !== "") {
        var imEqGlCookie = usercookie.getCookie("imEqGl");
        var len = usercookie.getCookie("imEqGl").length;
        if (len === 0) {
          usercookie.setCookie("imEqGl", value, "1", ReqObj.Form[tmpId].modId);
        } else {
          if (imEqGlCookie.substring(0, len - 2) === ",") {
            value = imEqGlCookie + value + ",";
          } else {
            value = imEqGlCookie + "," + value;
          }
  
          usercookie.setCookie("imEqGl", value, "1", ReqObj.Form[tmpId].modId);
        }
      }
      return value;
    }
    return "";
  }
  
  function RemoveValFromImEqGl(val) {
    if (isSet(val) && val !== "") {
      var imEqgl = usercookie.getCookie("imEqGl");
      if (isSet(imEqgl) && trimVal(imEqgl) !== "" && imEqgl !== "undef") {
        var arr = imEqgl.split(",");
        for (var s = arr.length - 1; s >= 0; s--) {
          if (isSet(arr[s])) {
            if (arr[s] === val) arr.splice(s, 1);
          }
        }
      }
    }
  }
  
  function toShowBuyerInfo(tmpId, screen_name) {
    if (
      imeshExist() !== "" &&
      !isMoglixUi(tmpId) &&
      !pdpInactiveBL(tmpId) &&
      !pdpenqImage(tmpId) &&
      screen_name.toLowerCase() !== "userverification" &&
      screen_name.toLowerCase() !== "thankyou"
    ) {
      $("#t" + tmpId + "_byrinfo")
        .html(get_buyer_info(tmpId))
        .removeClass("bedsnone");
    } else {
      $("#t" + tmpId + "_byrinfo")
        .html(get_buyer_info(tmpId))
        .addClass("bedsnone");
    }
    // Not found BL
    if (Bl04(tmpId) && imeshExist() !== "")
      $("#t" + tmpId + "_byrinfoIn")
        .html(get_buyer_info(tmpId))
        .removeClass("bedsnone");
  }
  
  function get_buyer_info(tmpId) {
    var details = "";
    var imeshcookie = imeshExist();
    if (imeshcookie === "") return "";
    var sections = {};
    sections["main"] = "Your Contact Information :";
    sections["buyername"] =
      isSet(ReqObj.UserDetail["fn"]) && ReqObj.UserDetail["fn"] !== ""
        ? ReqObj.UserDetail["fn"]
        : "";
    sections["buyermobile"] =
      isSet(ReqObj.UserDetail["mb1"]) && ReqObj.UserDetail["mb1"] !== ""
        ? "+" +
          usercookie.getParameterValue(imeshcookie, "phcc") +
          "-" +
          ReqObj.UserDetail["mb1"]
        : "";
    sections["buyeremail"] =
      isSet(ReqObj.UserDetail["em"]) && ReqObj.UserDetail["em"] !== ""
        ? ReqObj.UserDetail["em"]
        : "";
    var cls = isImageVidEnq(tmpId) ? "epUstxt" : "";
    var details = "<b class='" + cls + "'>" + sections["main"] + "</b><br/>";
    if (sections["buyername"] !== "") {
      details += sections["buyername"];
      details += pdpenqImage(tmpId)
        ? returnSpan("", "", "   |   ", "befwt", "")
        : "</br>";
    }
    if (isOtherEnq(tmpId)) {
      if (sections["buyermobile"] !== "" && sections["buyeremail"] !== "") {
        details +=
          sections["buyermobile"] +
          returnSpan("", "", "   |   ", "befwt", "") +
          sections["buyeremail"];
      } else if (sections["buyermobile"] !== "") {
        details += sections["buyermobile"];
      } else if (sections["buyeremail"] !== "") {
        details += sections["buyeremail"];
      }
    } else {
      if (sections["buyermobile"] !== "") {
        details += sections["buyermobile"] + "</br>";
      }
      if (sections["buyeremail"] !== "") {
        details += sections["buyeremail"] + "</br>";
      }
    }
  
    if (
      sections["buyername"] === "" &&
      sections["buyermobile"] === "" &&
      sections["buyeremail"] === ""
    )
      return "";
  
    if (details !== "" && !pdpInactiveBL(tmpId)) {
      $("#t" + tmpId + "_leftR").addClass("btPd");
    }
    return details;
  }
  
  function ReturntoProp(tmpId) {
    var returnValue = JSON.parse(JSON.stringify(ReqObj.Original[tmpId]));
    returnValue.IsqArray = ReqObj.Form[tmpId].IsqArray;
    returnValue.displayImage = ReqObj.Form[tmpId].displayImage;
    returnValue.prodName = ReqObj.Form[tmpId].prodName;
    returnValue.generationId = ReqObj.Form[tmpId].generationId;
    returnValue.mcatName = ReqObj.Form[tmpId].mcatName;
    return returnValue;
  }
  
  function changeProd(event) {
    if (isSet(event) && isSet(event.data)) {
      ReqObj.changeProdClick = true;
      var tmpId = event.data.tmpId;
      var todo = event.data.todo;
      if (imeshExist() === "") {
        addDetachedFlag();
        //detachFlag2(tmpId);
      }
      $(".be-prdimg").children("img").attr("src", "");
      if (todo === "prev" && isSet(ReqObj.Form[tmpId].prev)) {
        ReqObj.ImageVideoIsqSeq = false;
        var returnObj = ReturntoProp(tmpId);
        ReqObj.Form[tmpId].prev(returnObj);
      } else if (todo === "next" && isSet(ReqObj.Form[tmpId].next)) {
        ReqObj.ImageVideoIsqSeq = false;
        var returnObj = ReturntoProp(tmpId);
        ReqObj.Form[tmpId].next(returnObj);
      }
    }
  }
  
  function BlEnqGenerated(tmpId) {
    if (
      isSet(tmpId) &&
      isSet(ReqObj.Form[tmpId].generationId) &&
      parseInt(ReqObj.Form[tmpId].generationId) > 1
    )
      return true;
    else return false;
  }
  
  function ShowProdName(tmpId) {
    if (
      ReqObj.Form[tmpId].modrefType.toLowerCase() === "product" &&
      !BlEnqGenerated(tmpId) &&
      (ReqObj.Form[tmpId].prodName === "" ||
        (ReqObj.Form[tmpId].prodName === "" && IsChatbl(tmpId)) ||
        (ReqObj.Form[tmpId].formType.toLowerCase() === "bl" &&
          (tmpId.substring(0, 2) === "09" || tmpId.substring(0, 2) === "04")) ||
        (ReqObj.Form[tmpId].formType.toLowerCase() === "enq" &&
          (tmpId.substring(0, 2) === "04" || tmpId.substring(0, 2) === "01")))
    ) {
      ReqObj.Form[tmpId].flags.WasProdNamePresent = true;
      ReqObj.Form[tmpId].isproductshown = true;
      return true; //
    } else {
      return ReqObj.Form[tmpId].flags.WasProdNamePresent;
    }
  }
  
  function isProdNamePresent(tmpId) {
    return ReqObj.Form[tmpId].modrefType.toLowerCase() === "product" &&
      ReqObj.Form[tmpId].prodName !== ""
      ? true
      : false;
  }
  
  //improve logic for this function
  function ShowReqBox(tmpId) {
    if (
      isBlInline(tmpId) &&
      currentISO() !== "IN" &&
      isNewInlineBl(tmpId) &&
      showQuantityUnit(tmpId, ReqObj.Form[tmpId].IsqArray, 2)
    ) {
      return false;
    }
    if (
      isBlInline(tmpId) &&
      currentISO() !== "IN" &&
      isNewInlineBl(tmpId) &&
      !showQuantityUnit(tmpId, ReqObj.Form[tmpId].IsqArray, 2)
    ) {
      return true;
    }
    if (isBlInline(tmpId) && isNewInlineBl(tmpId)) return false;
    if (ReqObj.Form[tmpId].flags.isDescDivShown === true) return false;
    else return true;
  }
  
  function GetPopUpHtml(tmpId) {
    loadOverlay();
    var regex = /0901/gi;
    return ReqObj.OverlayHtml.replace(regex, tmpId);
  }
  
  function loadOverlay() {
    if (
      isSet($("#t0901_bewrapper").html()) &&
      $("#t0901_bewrapper").html() !== ""
    ) {
      ReqObj.OverlayHtml = $("#t0901_bewrapper").html();
    }
  }
  /*-----------------new proposed seq---------------------- */
  function _makeExtraKey(_classArray, _fallback) {
    var extraKey = {};
    var count = 0;
    for (var ele in _classArray) {
      count += 1;
      extraKey[count] = _extraKey(_classArray[ele], _fallback);
    }
    return extraKey;
  }
  function _extraKey(_className, _fallback) {
    switch (
      _className.toString().toLowerCase() // tr : toReplace, is:Service, hf:hasFallback, fObj : fallbackObj
    ) {
      case "enquirenow":
        return { tr: false, is: false, hf: true, fobj: null };
      case "userlogin":
        return { tr: true, is: false, hf: false, fobj: null };
      case "contactdetail":
        return { tr: false, is: false, hf: false, fobj: null };
      case "userverification":
        return { tr: false, is: false, hf: false, fobj: null };
      case "isq":
        return { tr: false, is: false, hf: true, fobj: _fallback };
      case "requirementdtl":
        return { tr: true, is: false, hf: false, fobj: null };
      case "moredetails":
        return { tr: true, is: false, hf: false, fobj: null };
      case "thankyou":
        return { tr: false, is: false, hf: false, fobj: null };
      case "productname":
        return { tr: true, is: false, hf: false, fobj: null };
      case "blstaticques":
        return { tr: true, is: false, hf: false, fobj: null };
    }
  }
  
  function _makeDataAndServiceArr(_classArray, attribute, type) {
    var array = {};
    var count = 0;
    for (var ele in _classArray) {
      count += 1;
      array[count] =
        type === 1 ||
        (type === 2 &&
          isSet(_classArray[ele]) &&
          _classArray[ele].toString().toLowerCase() === "contactdetail")
          ? attribute
          : [];
    }
    return array;
  }
  
  /**-------------------new seq----------------------------- */
  function _mandatDetailsFilled() {
    var ct = ReqObj.UserDetail.ctid || ReqObj.UserDetail.cityname || ReqObj.UserDetail.ctoth ? true : false;
    return ct === true && isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn ? true : false; // if city and name not present return true else false
  }
  function userCity() {
    if ( ReqObj.UserDetail.ctid === "" && ReqObj.UserDetail.cityname === "" && ReqObj.UserDetail.ctoth === "")
      return "";
    else return "notEmpty";
  }
  function _contactScreen(iso) {
    if (iso === "IN") {
      var ct = userCity();
      return (isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn === "") || ReqObj.UserDetail.em === "" || ct === "" ? true : false;
    } else {
      return (isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn === "") || ReqObj.UserDetail.mb1 === "" ? true : false;
    }
  }
  /**-------------------new seq----------------------------- */
  function NEC() {
    if (isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn) {
      if (currentISO() === "IN") {
        if ( ReqObj.UserDetail.em && (ReqObj.UserDetail.ctid || ReqObj.UserDetail.cityname || ReqObj.UserDetail.ctoth) )
          return false;
        else return true;
      } else {
        if (ReqObj.UserDetail.mb1) return false;
        else return true;
      }
    } else {
      return true;
    }
  }
    
  function setDetail(key) {
    return ReturnCorrectVal(
      usercookie.getParameterValue(imeshExist(), key),
      ReturnCorrectVal(ReqObj.UserDetail[key], "")
    );
  }
  
  function SetUserDetails(where) {
    createGlobalObject();
    var imeshcookie = imeshExist();
    ReqObj.UserDetail["fn"] =
      isSet(where) && where == "changeflag"
        ? ""
        : ReturnCorrectVal(
            usercookie.getParameterValue(imeshcookie, "fn"),
            ReqObj.UserDetail["fn"]
          );
    ReqObj.UserDetail["em"] =
      isSet(where) && where == "changeflag"
        ? ""
        : ReturnCorrectVal(
            usercookie.getParameterValue(imeshcookie, "em"),
            ReqObj.UserDetail["em"]
          );
    ReqObj.UserDetail["ctid"] =
      isSet(where) && where == "changeflag"
        ? ""
        : ReturnCorrectVal(
            usercookie.getParameterValue(imeshcookie, "ctid"),
            ReqObj.UserDetail["ctid"]
          );
    ReqObj.UserDetail["mb1"] =
      isSet(where) && where == "changeflag"
        ? ""
        : ReturnCorrectVal(
            usercookie.getParameterValue(imeshcookie, "mb1"),
            ReqObj.UserDetail["mb1"]
          );
    ReqObj.UserDetail["uv"] =
      isSet(where) && where == "changeflag"
        ? ""
        : ReturnCorrectVal(
            usercookie.getParameterValue(imeshcookie, "uv"),
            ReqObj.UserDetail["uv"]
          );
  }
  
  SetUserDetails();
  
  function setIPDetails(resp) {
    ReqObj.IPDetails["countryiso"] = resp.geoip_countryiso;
    ReqObj.IPDetails["countryname"] = resp.geoip_countryname;
    ReqObj.IPDetails["ipaddress"] = resp.geoip_ipaddress;
  }
  
  
  function currentIpCountry() {
    return usercookie.getParameterValue(usercookie.getCookie("iploc"), "gcnnm");
  }
  function tofindindexfn(array, component, obj) {
    for (var i = 0; i < array.length; i++) {
      if (ConstructorName(array[i][obj]).toLowerCase() === component) {
        return i;
      }
    }
  
    return -1;
  }
  function FormCloseButtons(tmpId) {
    $(document)
      .off("keydown.BlEnqForm")
      .on("keydown.BlEnqForm", function (event) {
        if (
          event.keyCode === 27 &&
          ReqObj.Form[tmpId].toFireEscTracking === true &&
          (ReqObj.Form[tmpId].formType.toLowerCase() === "bl" ||
            ReqObj.Form[tmpId].formType.toLowerCase() === "enq" ||
            IsChatBLOverlay(tmpId))
        ) {
          if (closeFormCond(tmpId)) FormCloseEnqBL(tmpId, event);
          else FormCloseStep(tmpId, event);
        }
      });
    $("#t" + tmpId + "_cls")
      .off("click")
      .on("click", function (event) {
        removeYTLoader(tmpId);
        if (closeFormCond(tmpId)) FormCloseEnqBL(tmpId, event);
        else FormCloseStep(tmpId, event);
      });
  }
  
  $(document).ready(function () {
    var window_width1 = $(window).width();
    ReqObj[windowctrlscroll] = window_width1;
  });
  
  function stopBgScroll() {
    $(".gl-wrapper").css("width", ReqObj[windowctrlscroll] + "px");
    $("html").addClass("scroll_layout");
  }
  
  function resumeBgScroll() {
    $("html").removeClass("scroll_layout");
    $(".gl-wrapper").css("width", 100 + "%");
  }
  
  //all global variable should be in one place
  
  loadOverlay();
  
  function createGlobalObject() {
    /* USE ONLY IF OBJECTS CAN BE REINITIALIZED, WITH NO HARM ! */
    validation = new Validation();
    usercookie = new UserCookie();
  }
  
  
  
  function SanitizeId(id) {
    return isSet(id)
      ? !isNaN(id)
        ? !isNaN(parseInt(id, 10))
          ? parseInt(id, 10)
          : defaultGenerationId
        : defaultGenerationId
      : defaultGenerationId;
  }
  
  //this function takes object (strictly)
  function isObjectEmpty(obj) {
    if (isSet(obj) && typeof obj === "object") {
      obj = ObjectTrim(obj);
      return !$.isEmptyObject(obj);
    } else return false;
  }
  
  function returnObjectSize(obj) {
    var count = 0;
  
    if (obj instanceof Object) {
      $.each(obj, function () {
        count = count + 1;
      });
    }
    return count;
  }
  
  // //both keyName and value should be string
  // function SetKeyInLocalStorage(keyName, value) {
  //   if (CheckLocalStorage()) {
  //     if (isSet(keyName) && typeof keyName === "string" && keyName !== "" && isSet(value) && value !== "") {
  //       localStorage.setItem(keyName, value);
  //     }
  //   }
  
  // }
  
  // function GetFromLocalStorage(keyName) {
  //   if (CheckLocalStorage()) {
  //     if (isSet(keyName) && keyName !== "") {
  //       var value = localStorage.getItem(keyName);
  //       return value;
  //     }
  //     return null;
  //   }
  //   return null;
  
  // }
  
  function StaticMessage() {
    var constantText = "Get verified supplier details instantly on your ";
    if (currentISO() === "IN") {
      constantText += "mobile";
    } else constantText += "email";
    return constantText;
  }
  
  /*
  function showBanner(tmpId) {
    if (isSet(ReqObj.Form[tmpId].formType) && ReqObj.Form[tmpId].formType === "Enq") {
      var utyp = ReturnCorrectVal(usercookie.getParameterValue(usercookie.getCookie('ImeshVisitor'), "utyp"), "");
      if (custTypeCheck(tmpId) === 'P') {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      return true;
    }
   
  }
   
   
  function custTypeCheck(tmpId) {
    if (isSet(ReqObj.Form[tmpId].rcvCustType) && ReqObj.Form[tmpId].rcvCustType !== "" && parseInt(ReqObj.Form[tmpId].rcvCustType, 10) < 700) {
      return 'P';
    }
    else {
      return 'F';
    }
  }
  */
  
  function ShowNameField(tmpId) {
    var ipcookie = iplocExist();
    if (!usercookie.getParameterValue(imeshExist(), "fn")) {
      if (
        currentISO() !== "IN" ||
        (ReqObj.ipLoc.zoneISO === "OTHER" && ipcookie === "")
      )
        return true;
      else {
        if (
          isSet(ReqObj.Form[tmpId].HideNameonFirstStep) &&
          parseInt(ReqObj.Form[tmpId].HideNameonFirstStep, 10) === 1
        )
          return false;
        return true;
      }
    } else {
      return false;
    }
  }
  
  function HideSuggester() {
    $("ul.ui-autocomplete").each(function () {
      $(this).hide();
    });
    var ul = $("ul.ui-autocomplete");
    // ul.css("display", "none");
    ul.parent().css("display", "none");
    // $(".be-sugg").css("display")
  }
  
  // function SuggestorHit() {
  //   var submit_url = "https://dev-suggest.imimg.com/suggest/suggest.php?q=jammu&tag=suggestions&limit=40&type=city&fields=state%2Cid%2Cstateid%2Cflname%2Calias&display_fields=value%2C%3Dstate&display_separator=%2C+&match=fuzzy&catid=101&showloc=1&p=42";
  //   $.ajax({
  //     cache: false,
  //     url: submit_url,
  //     type: 'GET',
  //     //timeout: 3000,
  //     dataType: 'json',
  //     success: function (data) {
  //       console.log(data);
  //     },
  //     error: function (o, st, e) {
  
  //     },
  //     complete: function (res) {
  
  //     }
  //   });
  // }
  // SuggestorHit();
  //
  
  function callfunc(foundArray, ObjectToFind) {
    for (var y = 0; y < foundArray.length; y++) {
      if (
        ObjectToFind.toLowerCase() ===
        ConstructorName(foundArray[y].Obj).toLowerCase()
      ) {
        foundArray.splice(y, 1)[0];
      }
    }
  }
  
  function RefactorUiArray(tmpId) {
    //find objects for isq and rd box and all those things which changes with product
    for (var b = 0; b < PnameDependent.length; b++) {
      callfunc(
        ReqObj.Form[tmpId].UiArray[ReqObj.Form[tmpId].FormSequence.StepCounter],
        PnameDependent[b]
      );
      RemoveService(
        ReqObj.Form[tmpId].FormSequence.FullServiceArray[
          ReqObj.Form[tmpId].FormSequence.StepCounter
        ],
        PnameDependent[b]
      );
    }
  }
  
  function RemoveService(arr, ObjectToFind) {
    if (isSet(arr)) {
      for (var i = 0; i < arr.length; i++) {
        if ( isSet(arr[i].fn) && ConstructorName(arr[i].fn).toLowerCase() === ObjectToFind.toLowerCase()) {
          arr.splice(i, 1);
          // delete arr[i];
          i -= 1;
          // arr[i].cb.push(PushObject);
          return true;
        } else {
          if (RemoveService(arr[i].cb, ObjectToFind) === true) {
            // arr[i].cb = [];
            return true;
          }
        }
        // }
      }
    }
  }
  
  /**
   * this function fires on enter press
   *
   * @param {*} tmpId
   */
  function RefactorFormArrays(tmpId) {
    RefactorUiArray(tmpId);
  }
  
  /**
   *@description
   *@usage this function is used when user presses enter on product name field
   * @param {*} tmpId
   */
  
  function DirectSubmitWithoutBlur(tmpId) {
    SetFormHtmlDefaultValue(tmpId);
    if (parseInt(ReqObj.Form[tmpId].disableRd) === 1) {
      ReqObj.Form[tmpId].flags.isDescDivShown = true;
    } else {
      ReqObj.Form[tmpId].flags.isDescDivShown = false;
    }
    setTemplateDefaultValue(
      tmpId.substring(0, 2),
      tmpId.substring(2, 4),
      ReqObj.Form[tmpId],
      ReqObj.Form[tmpId].flags.isDescDivShown
    );
  
    ReqObj.Form[tmpId].mcatId !== "-1" || ReqObj.Form[tmpId].catId !== "-1"
      ? GetIsq(tmpId)
      : "";
    ReqObj.Form[tmpId].GlobalIsqObject = new Isq(tmpId);
    if (isSet(ReqObj.Form[tmpId].isBlQtutShown)) {
      ReqObj.Form[tmpId].isBlQtutShown = false;
    }
  }
  
  function removeBLLoader(tmpId, type) {
    var NewTempId = isSet(tmpId) ? tmpId : "";
    if (NewTempId !== "" && IsChatbl(NewTempId)) {
      if (isSet(type) && type.toLowerCase() === "left")
        var ClassName = IsChatbl(tmpId) ? "cbl_ques" : "";
      else var ClassName = "txt-cnt";
      var element = $("#t" + NewTempId + "_typing");
      if (element.hasClass(ClassName)) element.remove();
    } else {
      // if (isSet(ReqObj.Form[tmpId].FormSequence) && ReqObj.Form[tmpId].FormSequence.StepCounter > 0) {
      //   var templateId = tmpId.substring(0, 2);
      //   NewTempId = tmpId.replace(templateId, "09");
      // }
  
      var el = $("#t" + NewTempId + "_belodr");
      if (!el.hasClass("bedsnone")) {
        el.addClass("bedsnone");
      }
    }
  }
  
  //test work done
  function addBlLoader(tmpId, type) {
    var NewTempId = tmpId;
    if (NewTempId !== "" && IsChatbl(NewTempId)) {
      if (!($("#t" + tmpId + "_typing").length > 0)) {
        if (IsChatbl(tmpId)) {
          // $("#t" + NewTempId + "_bl_form").append(appendChatLoader(tmpId, type, "blchat-lodr2"));
          $("#t" + NewTempId + "_new_chatbl").append(
            appendChatLoader(tmpId, type, "txt_area  cbl_bg1")
          );
        }
      }
      //$("#t" + NewTempId + "_bl_form").append(appendChatLoader(tmpId, type));
    } else {
      // if (isSet(ReqObj.Form[tmpId].FormSequence) && ReqObj.Form[tmpId].FormSequence.StepCounter > 0) {
      //   var templateId = tmpId.substring(0, 2);
      //   var NewTempId = tmpId.replace(templateId, "09");
      // }
      var el = $("#t" + NewTempId + "_belodr");
      if (el.hasClass("bedsnone")) {
        el.removeClass("bedsnone");
      }
    }
  }
  
  function addYTLoader(tmpId, type) {
    var el = $("#t" + tmpId + "_belodrYT");
    if (el.hasClass("bedsnone")) {
      el.removeClass("bedsnone");
    }
  }
  
  function removeYTLoader(tmpId, type) {
    var el = $("#t" + tmpId + "_belodrYT");
    if (!el.hasClass("bedsnone")) {
      el.addClass("bedsnone");
    }
  }
  function callFlagSuggestor(tmpId, fromwhere) {
    if (
      $("#t" + tmpId + "flagdiv2").length == 0 ||
      $("#t" + tmpId + "country_dropd").html() === "" ||
      (isSet(ReqObj.setflag) && ReqObj.setflag)
    ) {
      if ($("#t" + tmpId + "flagdiv2").length == 0) {
        var ele = "<div id='t" + tmpId + "flagdiv2' class='bedsnone'></div>";
        $("#t" + tmpId + "flagdiv").after(ele);
        ReqObj.Form[tmpId]["flagcalling"] = 0;
      }
      ReqObj["showcountry"] = true;
      flagsugg.setFlagSuggestor(tmpId, fromwhere);
    }
  }
  
  function ipFlagSuggestor() {
    var len = template_array.length;
    for (var i = 0; i < len; i++) {
      callFlagSuggestor(template_array[i], "load");
    }
  }
  
  function appendChatLoader(tmpId, type, loaderclass) {
    if (isSet(type) && type.toLowerCase() === "left") {
      var ParentdivClass = IsChatbl(tmpId) ? "cbl_ques cbl_type " : "";
      var loaderColorClass = loaderclass;
    } else {
      var ParentdivClass = IsChatbl(tmpId)
        ? "txt-cnt bemb10 cbl_ques cbl_type"
        : "txt-cnt bemb10 ";
      var loaderColorClass = loaderclass;
    }
    if (IsChatbl(tmpId))
      return (
        "<div id='t" +
        tmpId +
        "_typing' class='" +
        ParentdivClass +
        "'><div class='" +
        loaderColorClass +
        "'><span></span><span></span><span></span></div></div>"
      );
  
    return (
      "<div id='t" +
      tmpId +
      "_typing' class='" +
      ParentdivClass +
      "'><div class='typtext'><span class='spinme-left'><div class='" +
      loaderColorClass +
      "'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div></span></div></div>"
    );
  }
  
  function WrapperObj(outerHtml, closingHtml, suffix) {
    var wrapObj = {
      SuffixOuterHtml: outerHtml,
      SuffixClosingHtml: closingHtml,
      suffix: suffix,
    };
    return wrapObj;
  }
  function MakeWrapper(arrayofQues, tmpId, SuffixHtmlObj, type) {
    if (isSet(ReqObj.Form[tmpId].formType) && IsChatbl(tmpId)) {
      var Questext = IsChatbl(tmpId)
        ? "<div class = 'txt_area cbl_bg1'>"
        : "<div class='Question'>";
      var userInput = IsChatbl(tmpId)
        ? ""
        : "<div class='t" + tmpId + "_userInput' class='bewbg'>";
      for (var i = 0; i < arrayofQues.length; i++) {
        for (var j = 0; j < arrayofQues[i].length; j++) {
          Questext += arrayofQues[i][j].Label;
          // userInput += "<span class='bepr'>" + arrayofQues[i][j].UserInput + "</span>";
          userInput += arrayofQues[i][j].UserInput;
        }
      }
      Questext += "</div>";
      userInput += "</div>";
      var textToWrap = !IsChatbl(tmpId)
        ? Questext + userInput
        : type === "ques"
        ? Questext
        : userInput;
  
      var classtotest = chatBlClass(tmpId, "left");
      var leftright = IsChatbl(tmpId) ? SuffixHtmlObj.SuffixOuterHtml : "";
      return ConversationLeftWrapper(tmpId, textToWrap, {
        classtotest: classtotest,
        leftright: leftright,
      });
    } else {
      var normalHtml = SuffixHtmlObj.SuffixOuterHtml;
      var beRowHtml = "";
      var closingRowDiv = "";
      var ClearBothDiv = "";
  
      if (isSet(SuffixHtmlObj)) {
        if (isSet(SuffixHtmlObj.suffix) && SuffixHtmlObj.suffix !== "") {
          if (SuffixHtmlObj.suffix === "_isqBox" || SuffixHtmlObj.suffix === "_contactinfo" || SuffixHtmlObj.suffix === "_Prodname") {
            var clsName = currentISO() !== "IN" && SuffixHtmlObj.isPhone === true ? isMoglixUi(tmpId) ? "eqflot eqIsf eqIsMn mt19 pr" : "eqflot eqIsf eqIsMn mt19"
              : isMoglixUi(tmpId)? "eqflot bepr bemt10" : "eqflot bepr";
  
            var wrapClass = isSSB(tmpId) ? ssbClass("wrprClass", tmpId) : isBlInline(tmpId) ? isBlInlineFr(tmpId) ? " fmb15" : " idsf pfstrt mb20" : pdpInactiveBL(tmpId) ? SuffixHtmlObj.suffix === "_contactinfo" ? "" : " be-row2" : " be-row";
  
            beRowHtml += SuffixHtmlObj.suffix === "_contactinfo" && isOtherEnq(tmpId) ? "<div class='" + clsName + "'>" : "<div class='" + wrapClass + "'>";closingRowDiv += "</div>";
          }
  
          if (SuffixHtmlObj.suffix === "_contactinfo") {
            if (isBlFirstfold(tmpId))
              ClearBothDiv += "<div class='beclr'></div>";
            else {
              if (currentISO() === "IN")
                ClearBothDiv += "<div class='beclr'></div>";
            }
          }
  
        }
      }
  
      if (pdpInactiveBL(tmpId) &&SuffixHtmlObj.suffix === "_contactinfo" && arrayofQues.length == 3) {
        normalHtml += '<div class="NameEmail">';
      }
  
      for (var i = 0; i < arrayofQues.length; i++) {
        for (var j = 0; j < arrayofQues[i].length; j++) {
  
          if ( isSet(arrayofQues[i][j].WrapClass) && arrayofQues[i][j].WrapClass != "" && SuffixHtmlObj.suffix === "_isqBox")
            beRowHtml = "<div class='" + wrapClass + " " + arrayofQues[i][j].WrapClass +"'>";
  
          if (!isSSB(tmpId) ||(isSSB(tmpId) && SuffixHtmlObj.suffix !== "_isqBox")) {
            if (pdpInactiveBL(tmpId) && SuffixHtmlObj.suffix === "_contactinfo" && arrayofQues.length == 3 && i == 2) {
              normalHtml += "</div>";
            }
            normalHtml += beRowHtml;
          }
  
          if (isSet(arrayofQues[i][j].WrapClass) &&arrayofQues[i][j].WrapClass != "" &&SuffixHtmlObj.suffix === "_isqBox")
            beRowHtml = "<div class='" + wrapClass + "'>";
  
          if (isSSB(tmpId) && SuffixHtmlObj.suffix === "_isqBox") {
            beRowHtml =(isSet(arrayofQues[i].clsNm) && arrayofQues[i].clsNm === false) ||(isSet(arrayofQues[i][j].clsNm) &&arrayofQues[i][j].clsNm === false)
                ? "<div class=''>"
                : "<div class='" + ssbClass("wrprClass", tmpId) + "'>";
            normalHtml += beRowHtml;
          }
  
          if (isSet(arrayofQues[i][j].isenquire) &&arrayofQues[i][j].isenquire === true) {
            normalHtml =SuffixHtmlObj.SuffixOuterHtml + "<div class='eqmb5 eqmt20'>";
          }
  
          normalHtml +=
            arrayofQues[i][j].OuterWrapper +
            arrayofQues[i][j].Label +
            arrayofQues[i][j].UserInput +
            arrayofQues[i][j].ClosingWrapper;
        }
        normalHtml += closingRowDiv;
      }
  
      normalHtml += SuffixHtmlObj.SuffixClosingHtml;
      normalHtml += ClearBothDiv;
      return normalHtml;
    }
  }
  function checkdefaultIsq(tmpId, QuestionText, type, option) {
    if (
      isSet(ReqObj.Form[tmpId].defaultIsq) &&
      ReqObj.Form[tmpId].defaultIsq === "1" &&
      isSet(type) &&
      type.toLowerCase() === "radio"
    ) {
      QuestionText = QuestionText.toLowerCase();
      for (var isq in DefaultIsqAns)
        return (
          isSet(QuestionText.match(isq.toLowerCase())) &&
          option.toLowerCase() === DefaultIsqAns[isq].toLowerCase()
        );
    }
    return false;
  }
  function ChatBlMsgs(QuestionText, type) {
    if (isSet(QuestionText)) {
      var defaultmsg = "What is your preferred";
      if (isSet(type) && type.toLowerCase() === "radio") {
        defaultmsg = "Please select";
      }
      var QuestionTextMatch = trimVal(QuestionText.toLowerCase());
      if (QuestionTextMatch in ChatBlStaticMsg) {
        return ChatBlStaticMsg[QuestionTextMatch];
      } else {
        var splitting = defaultmsg.split(" ");
        var last_word = splitting[splitting.length - 1];
        splitting = QuestionText.split(" ");
        var first_word = splitting[0];
        if (QuestionText.toLowerCase().includes("sample order"))
          return "Is this a sample order" + QuestionEnding;
        if (first_word.toLocaleLowerCase() === last_word.toLocaleLowerCase()) {
          defaultmsg = defaultmsg.substr(0, defaultmsg.lastIndexOf(" ") + 1);
        }
        defaultmsg += " ";
        if (isSet(type) && type.toLowerCase() === "radio") {
          return defaultmsg + "<strong>" + QuestionText + "</strong>";
        }
        return (
          defaultmsg + "<strong>" + QuestionText + "</strong>" + QuestionEnding
        );
      }
    }
  }
  
  function ConversationLeftWrapper(tmpId, message, classObj, name) {
    /* add attributes at end  */
    if (isSet(message) && message !== "") {
      if (IsChatbl(tmpId) && !isSet(name)) {
        return classObj.leftright + message + "</div>";
      }
      return (
        '<div class="' +
        classObj.leftright +
        '"><div class="' +
        classObj.classtotest +
        '">' +
        message +
        "</div></div>"
      );
    }
  }
  
  function ConversationRightWrapper(tmpId, message, classObj) {
    /* add attributes at end  */
    if (
      IsChatbl(tmpId) &&
      isSet(message) &&
      (message.toLowerCase() === "not answered" || message === "")
    ) {
      return "";
    }
    if (isSet(message) && message !== "") {
      var messagetoshow = IsChatbl(tmpId)
        ? "<div class='txt_area'>" + message + "</div>"
        : "";
  
      return IsChatbl(tmpId)
        ? '<div class="' + classObj.leftright + '">' + messagetoshow + "</div>"
        : '<div class="' +
            classObj.leftright +
            '"><div class="' +
            classObj.classtotest +
            '">' +
            messagetoshow +
            "</div></div>";
    }
  }
  
  function ConversationCenterWrapper(tmpId, message) {
    /* add attributes at end  */
    if (isSet(message) && message !== "")
      if (!IsChatbl(tmpId))
        return '<div class="chat-mblV chat-blH">' + message + "</div>";
      else return '<div class ="cbl_verfy">' + message + "</div>";
  }
  
  function getTimeStamp() {
    var date = new Date();
    var time = date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds();
    return time % 10 === 0 ? true : false;
  }
  
  function returnIsoHtml(tmpId, isoclass, isovalue) {
    /* add attributes at end */
    if (!isSet(isovalue)) isovalue = "";
    return (
      '<input type="text" value="' +
      isovalue +
      '" readonly="" name="iso" id="t' +
      tmpId +
      '_iso" class="' +
      isoclass +
      '" tabindex="-1" disabled="disabled">'
    );
  }
  
  function returnInput(
    tmpId,
    element,
    type,
    name,
    placeholder,
    inputclass,
    value,
    inlinestyle,
    maxlength,
    attribute
  ) {
    /* add attributes at end  */
    return (
      '<input id="' +
      tmpId +
      element +
      '" type="' +
      type +
      '" name="' +
      name +
      '" value="' +
      value +
      '" class="' +
      inputclass +
      '" placeholder="' +
      placeholder +
      '" maxlength="' +
      maxlength +
      '" style="' +
      inlinestyle +
      '"' +
      attribute +
      '="">'
    );
  }
  
  function returnButton(tmpId, element, buttontext, buttonclass, bstyle) {
    /* add attributes at end  */
    return (
      '<button id="' +
      tmpId +
      element +
      '" class="' +
      buttonclass +
      '" style="' +
      bstyle +
      '">' +
      buttontext +
      "</button>"
    );
  }
  
  function returnContainer(
    tmpId,
    element,
    containerclass,
    datarole,
    divtext,
    style
  ) {
    /* add attributes at end  */
    if (!isSet(divtext)) divtext = "";
    return (
      '<div id="' +
      tmpId +
      element +
      '" class="' +
      containerclass +
      '" data-role="' +
      datarole +
      '" style="' +
      style +
      '">' +
      divtext
    );
  }
  
  function returnTextarea(tmpId, element, containerclass, placeholder) {
    /* add attributes at end  */
    return (
      '<textarea id="' +
      tmpId +
      element +
      '" class="' +
      containerclass +
      '" placeholder="' +
      placeholder +
      '" />'
    );
  }
  
  function returnSpan(tmpId, element, text, spanclass, style) {
    /* add attributes at end  */
    return (
      '<span id="' +
      tmpId +
      element +
      '" class="' +
      spanclass +
      '" style="' +
      style +
      '" >' +
      text +
      "</span>"
    );
  }
  
  function returnLabel(tmpId, text, element, labelclass) {
    /* add attributes at end  */
    return (
      '<label id="' +
      tmpId +
      element +
      '" class="' +
      labelclass +
      '">' +
      text +
      "</label>"
    );
  }
  
  function returnDl(tmpId, element, dlclass, disabled) {
    /* add attributes at end  */
    return (
      '<dl id="' +
      tmpId +
      element +
      '" class="' +
      dlclass +
      '" disabled="' +
      disabled +
      '"></dl>'
    );
  }
  
  function returnA(tmpId, element, href, target, aclass) {
    /* add attributes at end  */
    return (
      '<a href="' + href + '" target="' + target + '" class="' + aclass + '">'
    );
  }
  
  function returnImg(tmpId, element, src, imgclass) {
    /* add attributes at end  */
    return (
      '<img id="' +
      tmpId +
      element +
      '"src="' +
      src +
      '" class="' +
      imgclass +
      '">'
    );
  }
  
  function returnOption(tmpId, element, value, optionid, optiontext) {
    return (
      '<option value="' +
      value +
      '" optionid="' +
      optionid +
      '">' +
      optiontext +
      "</option>"
    );
  }
  
  function returnCustomElement(
    tmpId,
    element,
    customele,
    value,
    optionid,
    selected,
    optiontext
  ) {
    return (
      "<" +
      customele +
      ' value="' +
      value +
      '" optionid="' +
      optionid +
      '"' +
      selected +
      " >" +
      optiontext +
      "</" +
      customele +
      ">"
    );
  }
  
  function returnAnswer(tmpId, key) {
    return ReqObj.Form[tmpId].UserInputs[key];
  }
  
  function flagwrapper(message) {
    return '<div class="cbl_flag">' + message + "</div>";
  }
  
  function skipDiv1(tmpId) {
    //chat bl bug
    var skiphtml1 = returnContainer("", "", "cbl_resend cbl_skip", "", "", "");
    skiphtml1 += returnButton(
      "t" + tmpId,
      "_submitNo1",
      "Skip",
      "cbl_brd1 cbl_clr1 cbl_cp"
    );
    skiphtml1 += "</div>";
    return skiphtml1;
  }
  
  function skipDiv2(tmpId) {
    //chat bl bug
    var skiphtml2 = returnContainer("", "", "cbl_resend cbl_skip", "", "", "");
    skiphtml2 += returnButton(
      "t" + tmpId,
      "_submitNo2",
      "Skip",
      "cbl_brd1 cbl_clr1 cbl_cp"
    );
    skiphtml2 += "</div>";
    return skiphtml2;
  }
  
  function addLine() {
    return '<div class="cbl_line"></div>';
  }
  
  function ssbClass(type, tmpId) {
    if (type === "label") return isnewSSB(tmpId) ? "nb-fmlbl" : "mb-lbl";
    if (type === "reqBxLbl")
      return isnewSSB(tmpId) ? "nb-fmlbl" : "mb-lbl mb-mt10";
    if (type === "wrprClass")
      return isnewSSB(tmpId) ? "nb-frm nb-mt25" : "mb-flex mb-pdt15 mb-fxstrt";
    if (type === "radin") return isnewSSB(tmpId) ? "nb-radin" : "mb-radin";
    if (type === "radio")
      return isnewSSB(tmpId) ? "nb-rad radioClick" : "mb-rad radioClick";
    if (type === "radlbl") return isnewSSB(tmpId) ? "nb-radlbl" : "mb-radlbl";
    if (type === "otp")
      return isnewSSB(tmpId)
        ? "nb-flex nb-otpm "
        : "mb-wdIn mb-flex mb-otpm mb-otpHt";
    if (type === "skipotp") return isnewSSB(tmpId) ? "nb-crPnt" : "mb-crPnt";
    if (type === "resendotp")
      return isnewSSB(tmpId) ? "nb-rsd nb-crPnt" : "mb-rsd mb-crPnt";
    if (type === "errorotp")
      return isnewSSB(tmpId)
        ? "nb-ertxt nb-dib bedsnone"
        : "mb-ertxt mb-dib bedsnone";
    if (type === "verifyotp")
      return isnewSSB(tmpId) ? "nb-mbuTxt nb-lh18" : "mb-mbuTxt mb-lh18";
    if (type === "otplabel")
      return isnewSSB(tmpId) ? "nb-lbl nb-pdt10 nb-pdr10" : "mb-lbl";
    if (type === "otpwrap")
      return isnewSSB(tmpId)
        ? "nb-flex nb-pdt15 nb-fxstrt"
        : "mb-flex mb-pdt15 mb-fxstrt";
    if (type === "speccity")
      return isnewSSB(tmpId) ? "nb-w160 nb-Mr15" : "mb-w222 mb-Mr15";
    if (type === "html")
      return isnewSSB(tmpId)
        ? "nb-SbHd nb-hp nb-pr nb-pdt15 nb-crPnt"
        : "mb-SbHd mb-hp mb-pr mb-pdt15 mb-crPnt";
    if (type === "htmli") return isnewSSB(tmpId) ? "nb-SbHd" : "mb-SbHd";
    if (type === "disable") return isnewSSB(tmpId) ? "nb-inpDisb" : "mb-inpDisb";
  }
  
  function returnIsqHtmlObj(RecurOfQues, tmpId) {
    var imeshcookie = imeshExist(); //ff_here
  
    if (isSSB(tmpId)) return returnSSBIsqHtml(RecurOfQues, tmpId);
    // var qtcls = (isBlInline(tmpId)) ? "qut_cus iqutm" : "qut_cus";
    var qtcls = isBlInline(tmpId)
      ? "qut_cus iqutm"
      : isBlFirstfold(tmpId)
      ? imeshcookie == "" && currentISO() == "IN"
        ? "qut_cus qut_ffun qtmt"
        : "qut_cus qut_ffid qtmt"
      : "qut_cus"; //ff_here
    var blfrcls = isBlInlineFr(tmpId) ? " flx1" : "";
    var outrdiv = isBlInline(tmpId)
      ? RecurOfQues[0].label_div +
        "<div class='inW240" +
        blfrcls +
        "'>" +
        RecurOfQues[0].error_div +
        "<div id='t" +
        tmpId +
        "qut_id' class='" +
        qtcls +
        "'>"
      : RecurOfQues[0].error_div +
        RecurOfQues[0].label_div +
        "<div id='t" +
        tmpId +
        "qut_id' class='" +
        qtcls +
        "'>";
    return [
      {
        ClosingWrapper: isBlInline(tmpId) ? "</div></div>" : "</div>",
        Label: IsChatbl(tmpId) ? "<div>" + ChatBlMsgs("Quantity") + "</div>" : "",
        OuterWrapper: outrdiv,
        UserInput: RecurOfQues[0].UserInput + RecurOfQues[1].UserInput,
        beforeInput: "",
        beforeLabel: "",
        qtuttype: 6,
      },
    ];
  }
  
  //Scroll Bottom
  function scrollSmoothToBottom(id) {
    var scrollDiv = document.getElementById(id);
    if (isSet(scrollDiv)) {
      $("#" + id).animate(
        {
          scrollTop: scrollDiv.scrollHeight - scrollDiv.clientHeight,
        },
        500
      );
    }
  }
  
  function newchatblScroll(id, tmpId) {
    $("#t" + tmpId + "_scroll").animate(
      {
        scrollTop: $("#t" + tmpId + "_scroll").prop("scrollHeight"),
      },
      1000
    );
    $("#t" + tmpId + "_scroll").on("mousewheel", function (e) {
      $("#t" + tmpId + "_scroll").stop(true, true);
      return true;
    });
  }
  
  function IsFormBL(tmpId) {
    var BLFormNames = ["bl", "chatbl", "chatbl-inline"];
  
    if (isSet(tmpId) && isSet(ReqObj.Form[tmpId])) {
      if (isSet(ReqObj.Form[tmpId].formType))
        var indexOfBl = $.inArray(
          ReqObj.Form[tmpId].formType.toLowerCase(),
          BLFormNames
        );
      if (indexOfBl !== -1) return true;
      else return false;
    }
  }
  
  function CallGeneration(tmpId) {
    if (isSet(tmpId)) {
      if (
        parseInt(ReqObj.Form[tmpId].generationId, 10) <= 1 &&
        ExistsInArray(ReqObj.Form[tmpId].HitArray, "Generation") !== true &&
        ExistsInArray(ReqObj.Form[tmpId].ServiceSequence, "Generation") !== true
      )
        return true;
      else return false;
    } else {
    }
  }
  
  function SetAutoCompleteClass(tmpId, suffix) {
    var autocompleteClass = "be-sugg t" + tmpId + suffix;
    if (IsChatbl(tmpId)) {
      autocompleteClass += " bl-chat";
    } else if (isSSB(tmpId)) autocompleteClass += " mb-prod-sugg";
  
    return autocompleteClass;
  }
  
  function IsTNCChecked(tmpId, isMandatory, name) {
    var returnValidation = true;
    if (ReqObj.Form[tmpId].IsCheckboxChecked)
      /* If true return true; */
      returnValidation = true;
    else if (isMandatory) {
      if (currentISO() === "IN") returnValidation = true;
      else {
        if (isSet(name) && name !== "") {
          returnValidation = false;
        } else returnValidation = true;
      }
    } else returnValidation = true;
    if (returnValidation) {
      RemoveTncError(tmpId);
    } else {
      ShowTncError(tmpId);
    }
    return returnValidation;
  }
  
  function ShowTncError(tmpId) {
    //to make autofocus on tnc checked box
    // $("#t" + tmpId + "_tCondCheckBox").focus();
    $("#t" + tmpId + "_error_tCond")
      .text("Please agree to the terms and conditions")
      .removeClass("bedsnone");
  }
  
  function RemoveTncError(tmpId) {
    $("#t" + tmpId + "_error_tCond").addClass("bedsnone");
  }
  
  function ShowIsq(tmpId) {
      //|| (tmpId.substring(0, 2) === "09" && currentISO() !== "IN")
      if (
          parseInt(ReqObj.Form[tmpId].disableIsq) === 1 ||
          (currentISO() !== "IN" && ReqObj.Form[tmpId].Isq.HasHtmlCalled === true)
      )
          return false;
      else if(pdpenq(tmpId) && !ShowReqBox(tmpId)){
          return false;
      }
      else if (
          ReqObj.Form[tmpId].IsqArray === "" ||
          ReqObj.Form[tmpId].prevCount < ReqObj.Form[tmpId].IsqLength
      )
          return true;
      else return false;
  }
  
  function showQuantityUnit(tmpId, arr, type) {
    var isq = arr;
    var isq_length = isSet(isq) ? isq.length : 0;
    for (var i = 0; i < isq_length; i++) {
      if (isq[i].length === 2) {
        var isqtype = [
          isq[i][0].IM_SPEC_MASTER_DESC.toLowerCase(),
          isq[i][1].IM_SPEC_MASTER_DESC.toLowerCase(),
        ];
        if (
          $.inArray("quantity", isqtype) ||
          $.inArray("quantity unit", isqtype)
        ) {
          ReqObj.Form[tmpId].quantityunit = isq[i];
          if (type === 1) {
            return ReqObj.Form[tmpId].quantityunit[0]
              .IM_CAT_SPEC_CATEGORY_TYPE === "2"
              ? false
              : true;
          }
          return true;
        }
        return false;
      }
    }
    return false;
  }
  
  function ShowStaticQuestionForeign(tmpId) {
    // if (isSet(tmpId) && tmpId.substring(0, 2) === "09") {
    //   if (parseInt(ReqObj.Form[tmpId].disableIsq) !== 1 && currentISO() !== "IN") return true;
    //   return false;
    // }
    return false;
  }
  
  function GetObjectKeys(obj) {
    if (!Object.keys) {
      var keys = [];
  
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          keys.push(key);
        }
      }
      return keys;
    } else {
      return Object.keys(obj);
    }
  }
  
  function updateChatWidgetGlobalVar(tmpId) {
    if (IsChatBLInline(tmpId) && tmpId.substring(0, 2) === "08") {
      isChatWidgetOpen = $("#t" + tmpId + "_chatBL").hasClass("cbl_vh")
        ? false
        : true;
    }
  }
  
  function BlAutoSuggRowNum(tmpId) {
    if (isSet(tmpId)) {
      var row_num = 5;
      if (tmpId === "202") row_num = 3;
      if (IsChatbl(tmpId)) row_num = 4;
      return row_num;
    }
    return 5;
  }
  
  function ReturnBlUserName(tmpId) {
    var BLname = "";
    var firstName = "";
    if (isSet(ReqObj.UserDetail["fn"]) && ReqObj.UserDetail["fn"] !== "")
      firstName = ReqObj.UserDetail["fn"];
    else firstName = usercookie.getParameterValue(imeshExist(), "fn");
    if (IsChatbl(tmpId) && isSet(firstName) && firstName !== "") {
      var classtotest = !IsChatbl(tmpId)
        ? chatBlClass(tmpId, "left")
        : "txt_area cbl_bg1";
      var leftright = IsChatbl(tmpId) ? "cbl_ques cbl_vh" : "";
      BLname = ConversationLeftWrapper(
        tmpId,
        "Welcome " + firstName,
        {
          classtotest: classtotest,
          leftright: leftright,
        },
        "name"
      );
    }
    return BLname;
  }
  
 
  
  function IsChatBLInline(tmpId) {
    return ReqObj.Form[tmpId].formType.toLowerCase() === "chatbl-inline"
      ? true
      : false;
  }
  
  function IsChatBLOverlay(tmpId) {
    return ReqObj.Form[tmpId].formType.toLowerCase() === "chatbl" ? true : false;
  }
  
  function isnewSSB(tmpId) {
    return tmpId.substr(0, 2) === "06" &&
      isSet(ReqObj.Form[tmpId].isnewssb) &&
      ReqObj.Form[tmpId].isnewssb === "1"
      ? true
      : false;
  }
  
  function isBlInline(tmpId) {
    return isGlIdEven(tmpId) &&
      ReqObj.Form[tmpId].typeofform === "bl" &&
      tmpId.substr(0, 2) === "01" &&
      ReqObj.Form[tmpId].screenNumber < 0
      ? true
      : false;
  }
  
  function isBlFirstfold(tmpId) {
    return ReqObj.Form[tmpId].typeofform === "bl" &&
      tmpId.substr(0, 2) === "04" &&
      ReqObj.Form[tmpId].screenNumber < 0
      ? true
      : false;
  }
  
  function isScriptTag(name) {
    name = name.toLowerCase();
    if (
      name.includes("<script>") ||
      name.includes("</script>") ||
      name.includes("script&gt") ||
      name.includes("%3cscript") ||
      name.includes("script%253e") ||
      (name.includes("<") && name.includes(">"))
    )
      return true;
    else false;
  }
  
  function isBlInlineFlag(tmpId) {
    return isGlIdEven(tmpId) &&
      ReqObj.Form[tmpId].typeofform === "bl" &&
      tmpId.substr(0, 2) === "01"
      ? true
      : false;
  }
  
  
  
  function isOTPBoxHidden(tmpId) {
    return $("#t" + tmpId + "_otpbox").length === 0 ||
      $("#t" + tmpId + "_otpbox").hasClass("bedsnone")
      ? true
      : false;
  }
  
  function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault) e.preventDefault();
    e.returnValue = false;
  }
  
  function keydown(e) {
    var keys = [32, 33, 34, 35, 36, 37, 38, 39, 40];
    for (var i = keys.length; i--; ) {
      if (!isSet(e.target.id)) {
        if (e.keyCode === keys[i]) {
          preventDefault(e);
          return;
        }
      }
    }
  }
  
  function wheel(e) {
    preventDefault(e);
  }
  
  function disable_scroll() {
    if (window.addEventListener) {
      window.addEventListener("onmousewheel", wheel, false);
    }
    window.onmousewheel = document.onmousewheel = wheel;
    document.onkeydown = keydown;
  }
  
  function enable_scroll() {
    if (window.removeEventListener) {
      window.removeEventListener("onmousewheel", wheel, false);
    }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;
  }
  
  function IsProduction() {
    var isProd = webAddressLocation.match(/^dev/)
      ? false
      : webAddressLocation.match(/^stg/)
      ? false
      : true;
    return isProd;
  }

  function ResetUserDetails(key) {
    ReqObj.UserDetail[key] = "";
  }
  
  /**
  for future if we need to replace all duplicate tracking fired
  then replace numberToFind with number
  */
  function binaryArraySearch(array, number) {
    if (isSet(array)) {
      var numberToFind = number;
      var start = 0,
        end = array.length - 1;
      while (start <= end) {
        var mid = Math.floor((start + end) / 2);
        if (array[mid] === numberToFind) return mid;
        else if (array[mid] > numberToFind) {
          end = mid - 1;
        } else if (array[mid] < numberToFind) {
          start = mid + 1;
        }
      }
      return -1;
    }
    return -1;
  }
  
  function StaticQuesForeignUser(tmpId) {
    // if (currentISO() !== "IN" && (tmpId.substring(0, 2) === "09" || IsChatbl(tmpId))) return true;
    // else false;
  
    return false;
  }
  
  function updateEnrichShownKey(tmpId, isStatic, isAttachment) {
    ReqObj.Form[tmpId].flags.isEnrichShown.isStaticShown = isStatic;
    ReqObj.Form[tmpId].flags.isEnrichShown.isAttachmentShown = isAttachment;
  
    //is showAttachment is 1 we need to show the attachment
    if (ReqObj.Form[tmpId].showAttachment === "1") {
      ReqObj.Form[tmpId].flags.isEnrichShown.isAttachmentShown = false;
    } else if (ReqObj.Form[tmpId].showAttachment === "0") {
      ReqObj.Form[tmpId].flags.isEnrichShown.isAttachmentShown = true;
    } else if (
      ReqObj.Form[tmpId].showAttachment === "-1" &&
      ReqObj.Form[tmpId].formType.toLowerCase() === "bl"
    ) {
      if (StaticQuesForeignUser(tmpId)) {
        ReqObj.Form[tmpId].flags.isEnrichShown.isAttachmentShown = true;
      } else ReqObj.Form[tmpId].flags.isEnrichShown.isAttachmentShown = false;
    } else if (
      ReqObj.Form[tmpId].showAttachment === "-1" &&
      ReqObj.Form[tmpId].formType.toLowerCase() === "enq"
    ) {
      ReqObj.Form[tmpId].flags.isEnrichShown.isAttachmentShown = true;
    }
  }
  
  function returnIsEnrichShownKeyVal(tmpId) {
    if (
      (currentISO() === "IN" &&
        (ReqObj.Form[tmpId].flags.isEnrichShown.isStaticShown === false ||
          ReqObj.Form[tmpId].flags.isEnrichShown.isAttachmentShown === false)) ||
      (currentISO() !== "IN" &&
        ReqObj.Form[tmpId].flags.isEnrichShown.isAttachmentShown === false)
    ) {
      return true;
    }
    return false;
  }
  
  function chatBlClass(tmpId, todo) {
    // POPUPCHATBL
    if (todo === "left") {
      return "message-text2";
    } else if (todo === "right") {
      // later change to 08 ---POPUPCHATBL
      return "message-text3";
    } else if (todo === "yes") {
      return "blchat-btn2";
    } else if (todo === "change") {
      return "blchat-btn1";
    }
  }
  
  // function chatBlPopupInline(tmpId) {
  //   if ((chatblverlay(tmpid) || IsChatBLInline(tmpId)) && tmpId.substring(0, 2) === "08") { // later change to 08 ---POPUPCHATBL
  //     return "popup";
  //   }else
  //     return "nochat";
  // }
  
  
  
  function chatblFirstMsg(tmpId) {
    setTimeout(function () {
      $("#t" + tmpId + "hi").removeClass("dn"); //
      UpdateChatName(tmpId);
      if (imeshExist() !== "") {
        if (
          usercookie.getParameterValue(imeshExist(), "uv") !== "V" &&
          isSecondBl()
        ) {
        } else {
          var name = $("#t" + tmpId + "_hiid")
            .text()
            .substr(8);
          $("#t" + tmpId + "_hiid").html(
            "Welcome <span class='cbl_fwb'>" +
              name +
              "</span>, provide below details to get quick quotes from sellers"
          );
        }
      }
    }, 300);
  }
  
  function chatwidgetTransitions(tmpId) {
    $("#t" + tmpId + "_chatBL").addClass("cbl_smwrap");
    $("#t" + tmpId + "_bl_form_wrapper_cta").toggleClass("bedsnone");
    $("#t" + tmpId + "message_indicator").addClass("dn");
    $("#t" + tmpId + "_msgDiv").addClass("bedsnone");
    $($("#t" + tmpId + "_blchatfooter").children()[0])
      .removeClass("cbl_bg1")
      .addClass("cbl_bgf1");
    if (
      !(
        isSet($("#t" + tmpId + "_submitNo2")) &&
        $("#t" + tmpId + "_submitNo2").length > 0
      )
    ) {
      $("#t" + tmpId + "_blchatfooter").append(skipDiv2(tmpId)); //chat bl bug
      $("#t" + tmpId + "_submitNo2")
        .parent()
        .addClass("dn");
    }
  
    $($("#scrollTop").children()[0]).removeClass("tpbCbl"); //for dir
  }
  
  function chatblTransition(tmpId) {
    $("#t" + tmpId + "_chatBL").removeClass("cbl_adjust");
    $("#t" + tmpId + "_blchatfooter").removeClass("focus");
    $("#t" + tmpId + "_blchatbody").removeClass("cbl_htgrow");
    IsChatBLInline(tmpId)
      ? $("#t" + tmpId + "_newblchatReply")
          .html("")
          .addClass("cbl_br10 cbl_bgf1")
          .removeClass("cbl_bg1")
      : $("#t" + tmpId + "_newblchatReply").html("");
    IsChatBLInline(tmpId)
      ? $("#t" + tmpId + "_chatBL")
          .removeClass("bedsnone cbl_vh")
          .addClass("cbl_vv")
      : $("#t" + tmpId + "_chatBL")
          .removeClass("bedsnone")
          .css({
            display: "flex",
          });
    chatblHideTransition(tmpId);
    $("#t" + tmpId + "chngPrdDiv").removeClass("dn");
    $("#t" + tmpId + "_blchatfooter").focus();
    IsChatBLInline(tmpId) ? updateChatWidgetGlobalVar(tmpId) : "";
  }
  
  function updateChatBlProdName(tmpId) {
    //$(".productname").text(ReqObj.Form[tmpId].mcatName);
    $("#t" + tmpId + "_productname").html("");
  
    if (
      ShowProdName(tmpId) ||
      (ReqObj.Form[tmpId].mcatName === "" && ReqObj.Form[tmpId].prodName === "")
    ) {
      var html = " <span>Tell us what you need to Get Best Price</span>";
      if (IsChatBLOverlay(tmpId))
        html +=
          "<div class='cbl_msg'>Provide below details to get quick quotes from sellers</div>";
      $("#t" + tmpId + "_productname").append(html);
      return;
    }
    var html = " <span>Get Best Price </span> ";
    var productname =
      ReqObj.Form[tmpId].mcatName !== ""
        ? ReqObj.Form[tmpId].mcatName
        : ReqObj.Form[tmpId].prodName;
    if (productname !== "") {
      html +=
        "for <span class = 'cbl_fwb productname'>" + productname + "</span>";
    }
    if (IsChatBLOverlay(tmpId)) {
      var imeshcookie = imeshExist();
      if (imeshcookie !== "") {
        if (
          usercookie.getParameterValue(imeshcookie, "uv") !== "V" &&
          isSecondBl()
        ) {
          html +=
            "<div class='cbl_msg'>Provide below details to get quick quotes from sellers</div>";
        }
      } else
        html +=
          "<div class='cbl_msg'>Provide below details to get quick quotes from sellers</div>";
    }
    $("#t" + tmpId + "_productname").append(html);
  }
  
  function ChatblfooterAns(tmpId) {
    $("#t" + tmpId + "_blchatfooter").hasClass("focus")
      ? ""
      : setTimeout(function () {
          $("#t" + tmpId + "_blchatfooter").addClass("focus");
        }, 1000);
    $("#t" + tmpId + "_typhere").hasClass("dn")
      ? ""
      : setTimeout(function () {
          $("#t" + tmpId + "_typhere").addClass("dn");
          $("#t" + tmpId + "_newblchatReply").removeClass("cbl_vh");
        }, 1099);
  }
  
  function chatblHideTransition(tmpId) {
    $("#t" + tmpId + "_typhere").removeClass("dn");
    $("#t" + tmpId + "_newblchatReply").addClass("cbl_vh");
  }
  function foreignUserIsq() {
    var ShowForeignUserIsq = true;
    return ShowForeignUserIsq;
  }
  
  
  /*
   *
   * YANDEX TRACKING
   *
   */
  function yandex_impression_track(userType, formType, modId, data_arr) {
    // Yandex
    if (typeof ym !== "function") {
      (function (b, o, j, n, h, g, f) {
        b[h] =
          b[h] ||
          function () {
            (b[h].a = b[h].a || []).push(arguments);
          };
        b[h].l = 1 * new Date();
        (g = o.createElement(j)),
          (f = o.getElementsByTagName(j)[0]),
          (g.async = 1),
          (g.src = n),
          f.parentNode.insertBefore(g, f);
      })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
      ym(51115208, "init", {
        id: 51115208,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
      });
    }
    window.yaParams = {
      formType: formType, // "MODID-FromScroll"
      //"userType": [userType, { "formType": [formType, { "modId": [modId, data_arr] }] }]
      //"A": [userType, formType, modId, data_arr]
    };
    //userType: userType [ formType: formType { modId: data_arr } }
    ym(51115208, "params", window.yaParams || {});
  }
  /*
   *
   * YANDEX Parameter
   *
   */
  function getyandexParameter(tmpId) {
    // Yandex
  
    var data = {};
    data["userType"] = imeshExist() ? "Identified" : "UnIdentified";
    //var append = (isSet(ReqObj.Form[tmpId].source) && ReqObj.Form[tmpId].source !== "")
    if (isSet(ReqObj.Form[tmpId].source) && ReqObj.Form[tmpId].source !== "")
      data["formType"] =
        ReqObj.Form[tmpId].formType + "-" + ReqObj.Form[tmpId].source;
    else data["formType"] = ReqObj.Form[tmpId].formType;
    data["modId"] = ReqObj.Form[tmpId].modId;
    data["data_arr"] = [];
  
    if (IsChatbl(tmpId)) data["data_arr"].push(ReqObj.Form[tmpId].afflId);
    else {
      data["data_arr"].push(ReqObj.Form[tmpId].ctaName);
      data["data_arr"].push(ReqObj.Form[tmpId].section);
    }
  
    return data;
  }
  
  /*
   *
   * FIRE YANDEX
   *
   */
  
  function fireYandex(tmpId) {
    // Yandex
    var trackdata = getyandexParameter(tmpId);
    yandex_impression_track(
      trackdata.userType,
      trackdata.formType,
      trackdata.modId,
      trackdata.data_arr
    );
  }
  
  function isOtherEnq(tmpId) {
    return ReqObj.Form[tmpId].formType.toLowerCase() === "enq" ? true : false;
  }
  
  function isImageEnqDIR(tmpId){
    return ReqObj.Form[tmpId].formType.toLowerCase() === "enq" &&
      isSet(ReqObj.Form[tmpId].typeofform) &&
      (ReqObj.Form[tmpId].typeofform.toLowerCase() === "image" ||
      ReqObj.Form[tmpId].typeofform.toLowerCase() === "video")
      ? true
      : false;
  }  
  function getCurrentCounter(currentpage) {
    return currentpage.length;
  }
  
  function isHindi(str) {
    var split = str.split("");
    for (i = 0; i < split.length; i++) {
      var code = split[i].charCodeAt();
      if (code >= 2309 && code <= 2361) return true;
    }
    return false;
  }
  
  function isAllCharacters(str) {
    var exp = /^[a-zA-Z ]+$/;
    return exp.test(str);
  }
  
  function isAllNumbers(str) {
    var exp = /^[0-9]*$/;
    return exp.test(str);
  }
  
  function isAllSpecialChars(str) {
    var exp = /^[^a-zA-Z0-9]+$/;
    return exp.test(str);
  }
  
  function initGeolocationenq(tmpId) {
    if (navigator && navigator.geolocation) {
      var x_navigator = navigator.geolocation.getCurrentPosition(
        successCallbackenq,
        function () {
          console.log("error");
        },
        {
          timeout: 10000,
        }
      );
    }
  }
  
  function successCallbackenq(position) {
    lt = position.coords.latitude;
    lt = lt.toFixed(5);
    lg = position.coords.longitude;
    lg = lg.toFixed(5);
    accu = position.coords.accuracy;
    accu = accu.toFixed(5);
    if (isSet(lt) && isSet(lg) && lt !== "" && lg !== "") {
      gloc_city = "";
      gloc_cityid = "";
      var data = {
        token: "imartenquiryprovider",
        S_lat: lt,
        S_long: lg,
        GET_CITY: "Y",
        modid: modid,
      };
      var url = appsServerName + "index.php?r=Newreqform/GeoLocation";
      $.ajax({
        url: url,
        data: data,
        type: "POST",
        dataType: "json",
        success: function (res) {
          if (isSet(res) && parseInt(res.CODE) === 200) {
            loc_cityid = res["cityid"];
            loc_iso = res["countryiso"];
            gloc_city = res["cityname"];
            gloc_cityid = res["cityid"];
            newVal =
              "GeoLoc=lt%3D" +
              lt +
              "%7Clg%3D" +
              lg +
              "%7Caccu%3D" +
              accu +
              "%7Clg_ct%3D" +
              gloc_city +
              "%7Clg_ctid%3D" +
              gloc_cityid;
            var geolocdecode =
              "GeoLoc_lt=" +
              lt +
              "|lg=" +
              lg +
              "|accu=" +
              accu +
              "|lg_ct=" +
              gloc_city +
              "|lg_ctid=" +
              gloc_cityid;
            ReqObj.UserDetail["ipcityname"] = gloc_city;
            ReqObj.UserDetail["ipctid"] = gloc_cityid;
            var ipLoc = readCookie("iploc");
            if (ipLoc.includes("|GeoLoc_lt"))
              ipLoc = ipLoc.substr(0, ipLoc.indexOf("|GeoLoc_lt"));
            ipLoc += "|" + geolocdecode;
            var d = new Date();
            d.setTime(d.getTime() + 3 * 60 * 60 * 1000);
            var expires = "expires=" + d.toUTCString();
            document.cookie =
              "iploc=" +
              ipLoc +
              ";" +
              expires +
              "; domain=.indiamart.com; path=/";
            if (isSet(ReqObj.cityId) && isSet(ReqObj.cityId[0])) {
              ReqObj.UserDetail.ipcitid = gloc_cityid;
              ReqObj.UserDetail.ipcityname = gloc_city;
              $(ReqObj.cityId[0]).val(gloc_city);
              $(ReqObj.cityId[0]).focus();
              $(ReqObj.cityId[0]).parent().addClass("eqfcsed");
              if (isSet(ReqObj.cityId[1])) $(ReqObj.cityId[1]).val(gloc_cityid);
              ReqObj.Form[ReqObj.cityId[0].substr(2, 4)].cityTracking = 4;
            }
          } else {
            blenqGATracking("geoloc","service:GeoLocation:failure",res,1,ReqObj.cityId[0].substr(2, 4));
          }
        },
        error: function (res) {
          res = isSet(res) ? res : "response undefined";
          blenqGATracking("geoloc","service:GeoLocation:failure",JSON.stringify(res),1,ReqObj.cityId[0].substr(2, 4));
        },
      });
    }
  }
  
  
  
  function flagsugcall(tmpId, ctname, ciso) {
    if (ctname != "India" && ctname !== ReqObj.Form[tmpId].ctn) {
      $("#t" + tmpId + "country_dropd").html("");
      ReqObj.changeUserIso = ciso;
      ReqObj.setflag = 1;
      flagsugg.setFlagSuggestor(tmpId, "load");
    }
  }
  /*--------------------------------------------update disp zoom key-------------------------------------------------*/
  function updateDispZoomImage(tmpId, formType, step, fromwhere) {
    var mcatimage = getImage(ReqObj.Form[tmpId].mcatId);
  
    if (formType === "bl" || IsChatbl(tmpId)) {
      if (typeof mcatimage === "undefined" || mcatimage === "") {
        ReqObj.Form[tmpId].displayImage = "";
        ReqObj.Form[tmpId].zoomImage = "";
      } else if (isSet(mcatimage) && mcatimage !== "") {
        ReqObj.Form[tmpId].displayImage = mcatimage;
        ReqObj.Form[tmpId].zoomImage = mcatimage;
      }
    }
  
    if (formType === "bl" || IsChatbl(tmpId)) {
      if (
        (ReqObj.Form[tmpId].displayImage === "" &&
          ReqObj.Form[tmpId].zoomImage === "" &&
          $("#t" + tmpId + "defaultimage").length === 0) ||
        typeof mcatimage === "undefined" ||
        mcatimage === ""
      ) {
        getMcatImage(tmpId, {
          hasCallback: true,
          cbfunc: update_image,
        });
  
        addImage(tmpId, step, fromwhere);
      } else {
        addImage(tmpId, step, fromwhere);
      }
    }
  }
  
  function addImage(tmpId, step, fromwhere) {
    var type =
      step === 1 || fromwhere === "fromservice"
        ? "image"
        : ReqObj.Form[tmpId].ctaType.toLowerCase();
    var key = [
      {
        type: type,
        displayImage: isSet(ReqObj.Form[tmpId].displayImage)
          ? ReqObj.Form[tmpId].displayImage
          : "",
        zoomImage: isSet(ReqObj.Form[tmpId].zoomImage)
          ? ReqObj.Form[tmpId].zoomImage
          : "",
        vidUrl: isSet(ReqObj.Form[tmpId].vidUrl) ? ReqObj.Form[tmpId].vidUrl : "",
      },
    ];
    $("#t" + tmpId + "_prodimg").html(new ReqImage().displayHtml(tmpId, key, 0));
    if (type !== "video") $("#t" + tmpId + "_prodimg").removeClass("bedsnone");
  }
  
  /*---------------------------------------------------- update_Image---------------------------------------------------------- */
  function update_image(tmpId) {
    if (isSet(tmpId)) {
      if (ReqObj.Form[tmpId].displayImage !== "") {
        $("#t" + tmpId + "_prodimg").html(
          new ReqImage().getImage(
            tmpId + "_dispimage",
            "",
            ReqObj.Form[tmpId].displayImage
          ) +
            '<span class="be-blrprdimg"  style="background-image: url(' +
            ReqObj.Form[tmpId].displayImage +
            ');"></span>'
        );
      } else {
        $("#t" + tmpId + "_prodimg").html(getDefaultImage(tmpId));
      }
    }
  }
  
  function getDefaultImage(tmpId) {
    return (
      "<div id='t" +
      tmpId +
      "defaultimage' class='be-nobgimg'><div class='blnewform_sprit be-noimg'></div></div>"
    );
  }
  
  /*--------------------------------------------------MAIN LEFT SIDE FUNCTION CALLED------------------------------------------------ */
  
  function leftSideTransition(step, tmpId, fromwhere) {
    var formType = ReqObj.Form[tmpId].formType.toLowerCase();
    updateDispZoomImage(tmpId, formType, step, fromwhere);
  }
  /*--------------------------------------- Pass mcat id to get image if available---------------------------------------------- */
  function getImage(key) {
    return ReqObj.ImageKey[key];
  }
  /*--------------------------------------------left Side load zoom ---------------------------------------------------------------- */
  function leftSideLoadZoom(tmpId) {
    $("#t" + tmpId + "_zoomimage").on("load", function () {
      if ($("#t" + tmpId + "_prodimg > img")) {
        $("#t" + tmpId + "_prodimg > #t" + tmpId + "_dispimage").remove();
        $("#t" + tmpId + "_prodimg > #t" + tmpId + "_zoomimage").show();
      }
    });
  }
  
  function funcOth(id) {
    if ($("#" + id + " option:selected").val() === "Other") {
      $("#other_" + id + "_1").css("display", "block");
      $("#other_" + id + "_1").focus();
    } else {
      $("#other_" + id + "_1").css("display", "none");
    }
  }
  
  function funcClick(event, tmpId, count) {
    if (
      !$("#t" + tmpId + "_selectDD" + count).prop("readonly") &&
      event.id !== ""
    )
      return;
    removechatblerror(tmpId);
    $("#t" + tmpId + "select_name" + count).removeClass("dn");
    $(".cbl_sclBr").removeClass("dn");
    var list = $("#t" + tmpId + "select_name" + count);
    var link = $("#t" + tmpId + "_selectDD" + count);
    var firstchild = list[0].firstChild;
    list.find("li").click(function (e) {
      if (e.currentTarget === firstchild) {
        e.preventDefault();
        return;
      }
      var text = $(this).html();
      $(this).siblings().removeClass("cbl_selected");
      $(this).addClass("cbl_selected");
      $("._ul_select").addClass("dn");
      $(".cbl_sclBr").addClass("dn");
      if (text.toLowerCase() === "other") {
        $(link).removeAttr("readonly");
        $(link).prop("placeholder", "enter the unit");
        $(link).focus();
        text = "";
      } else {
        $(link).attr("readonly", "true");
      }
      link.val(text);
      $(".cbl_skip").addClass("dn");
      tov1(tmpId, text);
    });
  }
  
  
  function updateToAsk(tmpId) {
    ReqObj.Form[tmpId].cName.toask =
      imeshExist() !== "" &&
      (typeof ReqObj.UserDetail.cName === "undefined" ||
        (isSet(ReqObj.UserDetail.cName) && ReqObj.UserDetail.cName === ""))
        ? true
        : false;
  }
  
  function toAskCname(tmpId) {
    return typeof ReqObj.UserDetail.cName === "undefined" ||
      (isSet(ReqObj.UserDetail.cName) && ReqObj.UserDetail.cName === "")
      ? true
      : false;
  }
  
  function cNameIsq(tmpId) {
    return ReqObj.Form[tmpId].cName.rb === true ||
      ReqObj.Form[tmpId].cName.qtut === false ||
      ReqObj.Form[tmpId].cName.tov === false ||
      ReqObj.Form[tmpId].cName.tov1 === true ||
      ReqObj.Form[tmpId].cName.isq === false
      ? true
      : false;
  }
  
  function cNameConditions(tmpId) {
    var isoCurrent = currentISO();
    var isqc = cNameIsq(tmpId);
    ReqObj.Form[tmpId].cName.toask =
      imeshExist() !== "" &&
      ReqObj.Form[tmpId].cName.isShown === false &&
      (typeof ReqObj.UserDetail.cName === "undefined" ||
        (isSet(ReqObj.UserDetail.cName) && ReqObj.UserDetail.cName === ""))
        ? true
        : false;
    if (currentISO() !== "IN" && ReqObj.Form[tmpId].cName.toask === true)
      return true;
    ReqObj.Form[tmpId].cName.toask =
      ReqObj.Form[tmpId].cName.toask === true &&
      ReqObj.Form[tmpId].cName.cdiv === false
        ? true
        : false;
    if (
      ReqObj.Form[tmpId].cName.toask === true &&
      ReqObj.Form[tmpId].cName.prodServ === "P" &&
      isoCurrent === "IN"
    ) {
      return isqc;
    }
    return false;
  }
  
  function gstConditions(tmpId) {
    return currentISO() === "IN" &&
      ReqObj.UserDetail.cName !== "" &&
      ReqObj.Form[tmpId].gst.html === false &&
      ReqObj.gst.toask === true
      ? true
      : false;
  }
  function gstConditionsSSB(tmpId) {
    return currentISO() === "IN" &&
      ReqObj.UserDetail.cName !== "" &&
      ReqObj.gst.toask === true
      ? true
      : false;
  }
  
  function urlConditions(tmpId) {
    return currentISO() !== "IN" &&
      ReqObj.Form[tmpId].url.html === false &&
      ReqObj.url.toask === true
      ? { ask: true, what: "Website Url", key: 2 }
      : { ask: false, what: "", key: -1 };
  }
  
  function isRadioOtherClicked(revent) {
    var RadioBoxEl = $(revent);
    RadioBoxEl.children("input").prop("checked", false);
    RadioBoxEl.children("input").removeClass("waschecked");
    RadioBoxEl.removeClass("sl-box chksl");
    RadioBoxEl.children().children(".bechk-in").children().hide();
  }
  function RadioClick(tmpId) {
    $(".radioClick")
      .off("click")
      .on("click", function (event) {
        var tempId = event.target.id;
        tempId = tempId.substr(1, 4);
        var imeshcookie = imeshExist();
        if (IsChatbl(tmpId))
          $("#t" + tmpId + "_submitNo2") //chat bl bug
            .parent()
            .addClass("dn");
        var curEl = this;
        var name = $(this).attr("name");
        var isSelected = $(curEl).hasClass("waschecked");
  
        $("input[name='" + name + "']").each(function () {
          $(this).prop("checked", false).removeClass("waschecked");
          $(this).parent().removeClass("sl-box chksl");
          $(this).siblings("label").children(".bechk-in").children().hide();
        });
        var crb = false;
        if (!isSelected) {
          if (
            $("#t" + tmpId + "ques" + name.charAt(name.length - 1))
              .text()
              .toLowerCase() === "why do you need this"
          )
            crb = true;
          if (
            $("#" + curEl.id)
              .val()
              .toLowerCase() === "for reselling" ||
            $("#" + curEl.id)
              .val()
              .toLowerCase() === "for business use"
          ) {
            ReqObj.Form[tempId].cName.rb = true;
          } else {
            ReqObj.Form[tempId].cName.rb = false;
          }
          $(curEl).prop("checked", true).addClass("waschecked");
          $(curEl).parent().siblings(".oth_bx").children("input").val("");
          IsChatbl(tempId) || isSSB(tempId)
            ? ""
            : $(curEl).parent().addClass("sl-box chksl");
          $(curEl).siblings("label").children(".bechk-in").children().show();
          if (crb === true && !isEnq(tmpId)) onCName(tmpId, true);
        } else if (!IsChatbl(tmpId) && crb === true && !isEnq(tmpId)) {
          ReqObj.Form[tempId].cName.rb = false;
          onCName(tmpId, true);
        }
      });
  }
  
  function CheckBoxClick(tmpId) {
    setTimeout(function () {
      $(".cbl_chekbx").focus();
    }, 1800);
    $(".cbl_chekbx_btn ")
      .off("click")
      .on("click", function () {
        if (IsChatbl(tmpId)) {
          $("#t" + tmpId + "_submitNo1") //chat bl bug
            .parent()
            .addClass("dn");
        }
      });
    $(".CheckboxClick")
      .off("click")
      .on("click", function () {
        if (IsChatbl(tmpId)) {
          $("#t" + tmpId + "_submitNo1") //chat bl bug
            .parent()
            .addClass("bedsnone");
        }
        var checkBox = $(this);
        if (checkBox.siblings("input").prop("checked")) {
          checkBox.children(".bechk-in").children().hide();
          checkBox.parent().removeClass("chksl");
        } else {
          checkBox.children(".bechk-in").children().show();
          IsChatbl(tmpId) || isSSB(tmpId)
            ? ""
            : checkBox.parent().addClass("chksl");
        }
      });
  }
  
  function radCheck(el) {
    if (isSet(el)) {
      var id = $(el).children("span").attr("id");
      var str = id;
      var templateId = str.slice(0, 5);
      pfArr = ["", "", ""];
      if (isSet(ReqObj.Form[str.slice(1, 5)].staticPrefilledCity))
        enrichCityhtml(
          id,
          templateId,
          0,
          ReqObj.Form[str.slice(1, 5)].staticPrefilledCity
        );
      else enrichCityhtml(id, templateId, 0, pfArr);
    }
  }
  
  function enrichCityhtml(id, templateId, type, pfArr) {
    var ctid = templateId + "_enrich_city";
    var html_city = "";
    var err_id = templateId + "_error_city_locpref";
    if (
      $("#" + id).html() === "Anywhere in India" ||
      $("#" + id).html() === "Local Only" ||
      $("#" + id).text() === "Specific City"
    )
      $("#spcity").html("");
    if ($("#" + id).text() === "Specific City") {
      var cityId = "";
      let beWbl = pdpInactiveBL(templateId.substr(1, 5))? "beW10bl" :"beW15";
      for (i = 1; i < 4; i++) {
        cityId = "";
        cityId = ctid + i;
        if (templateId.substr(1, 2) === "06") {
          html_city +=
            "<div class='" +
            ssbClass("speccity", templateId.substr(1, 5)) +
            "'><label class=''>City " +
            i +
            "</label><input type='text' id=" +
            cityId +
            " name=" +
            cityId +
            " autocomplete='off'  class='' onblur='chckval(" +
            cityId +
            ",this.value);'><input type='hidden' id='" +
            cityId +
            "specificcity_hidden'></div>";
        } else {
          html_city +=
            "<div class='bepr "+ beWbl + " belft text_bx'><label class='be-lbl'>City " +
            i +
            "</label><input type='text' value = '" +
            pfArr[i - 1] +
            "' id=" +
            cityId +
            " name=" +
            cityId +
            " autocomplete='off'  class='be-slbox' onblur='chckval(" +
            cityId +
            ",this.value);'><input type='hidden' id='" +
            cityId +
            "specificcity_hidden'></div>";
        }
      }
      let bemt = pdpInactiveBL(templateId.substr(1, 5)) ? " bemt15" : " bemt5" ;
      if (!($("#spcity").length > 0))
        var citydiv =
          templateId.substr(1, 2) === "06" ? isnewSSB(templateId.substr(1, 5))
              ? "<div id='spcity' class='nb-flex nb-mt10' ></div>"
              : "<div id='spcity' class='mb-flex mb-mt10' style='height:54px;'></div>"
            : "<div id='spcity' class='be-row " + bemt + "' style='height:54px;'></div>";
      $("#" + id)
        .parent()
        .parent()
        .parent()
        .append(citydiv);
      $("#spcity").html(html_city);
    }
    if (
      $("#" + id).text() === "Local Only" ||
      $("#" + id).text() === "Anywhere in India"
    ) {
      $("#spcity").remove();
      if ($("#" + ctid + "_err").length)
        $("#" + ctid + "_err").addClass("bedsnone");
    } else if ($("#" + id).text() === "Specific City" && type !== 1) {
      var isSelected = $("#" + id)
        .parent()
        .siblings("input")
        .hasClass("waschecked");
      if (isSelected) $("#spcity").remove();
    }
    enrichCityMultiple(templateId);
  }
  function enrichCityMultiple(templateId) {
    var autosuggcls =
      templateId.substr(1, 2) === "06"
        ? isnewSSB(templateId.substr(1, 5))
          ? "be-sugg nb-spctysugg"
          : "be-sugg mb-spctysugg"
        : "be-sugg";
    for (var i = 1; i <= 3; i++) {
      if (document.getElementById(templateId + "_enrich_city" + i) !== null) {
        if (typeof Suggester !== "undefined") {
          window[templateId + "city_sugg_" + i] = new Suggester({
            element: templateId + "_enrich_city" + i,
            onSelect: selecttext_city_enrich,
            type: "city",
            fields: "std,state,id,stateid",
            placeholder: "",
            minStringLengthToDisplaySuggestion: 1,
            autocompleteClass: autosuggcls,
            displayFields: "value,state",
            displaySeparator: " >> ",
            filters: "iso:IN",
            recentData: false,
          });
        }
      }
    }
  }
  
  function selecttext_city_enrich(event, ui) {
    if (isSet(ui)) {
      this.value = ui.item.value;
      // $("#" + this.id + "specificcity_hidden").val(ui.item.value);
      $("#" + this.id + "specificcity_hidden").val(ui.item.data.id);
  
      // var cityid = this.id;
      //$("#")
      // document.getElementById(cityid).value = ui.item.data.id;
    }
  }
  
  function chckval(cityid, val) {
    // if (val == '') {
    //   $('#' + cityid).val('');
    // }
  }
  
  function blkerr(templateId) {
    // if ($('#' + templateId + 'error_city_locpref').css('display') == 'block') {
    //   $('#' + templateId + 'error_city_locpref').css('display', 'none');
    //   $('#' + templateId + 'enrich_city1').removeClass("highlight-err");
    // }
  }
  
  function thankYouTrack(tmpId, msg, sellerId) {
    var formtype =
      isSet(ReqObj.Form[tmpId].formType) &&
      ReqObj.Form[tmpId].formType.toLowerCase() === "bl"? "Post Buy Leads": "Send Enquiry";
    if (isSet(sellerId)) blenqGATracking(formtype, msg, sellerId, 1, tmpId);
    else blenqGATracking(formtype, msg, getEventLabel(), 1, tmpId);
    return true;
  }
  
  //This will be available as global variable
  var webAddressLocation = location.hostname;
  var appsServerName = webAddressLocation.match(/^dev/)
    ? "//dev-apps.imimg.com/"
    : webAddressLocation.match(/^stg/)
    ? "//stg-apps.imimg.com/"
    : "//apps.imimg.com/";
  
  function ProductName(tmpId, from) {
    this.ProductNameHTML = "";
    this.onselect = 0;
    this.tmpId = "";
    ReqObj.Form[tmpId].productObject = this;
    if (
      !isSSB(tmpId) &&
      !(tmpId.substr(0, 2) === "01" && isGlIdEven(tmpId)) &&
      from !== "enter"
    )
      $("#t" + tmpId + "_prodtitle").html("");
    this.className = "ProductName";
    this.isProdNameChanged = false;
    this.ProductNameHtmlObj = {
      Label: "",
      UserInput: "",
      OuterWrapper: "",
      ClosingWrapper: "",
    };
    this.ProductNameHtmlObjArray = [];
  }
  
  ProductName.prototype.addHtmlObjToArray = function (htmlObj) {
    this.ProductNameHtmlObjArray.push(htmlObj);
  };
  
  ProductName.prototype.displayAnswer = function (tmpId) {
    var classtotest = chatBlClass(tmpId, "right");
    var leftright = IsChatbl(tmpId) ? "cbl_ansr" : "";
    return [
      ConversationRightWrapper(tmpId, returnAnswer(tmpId, "ProductName"), {
        classtotest: classtotest,
        leftright: leftright,
      }),
    ];
  };
  
  ProductName.prototype.hasHtml = function (ProductNameObj) {
    if (isSet(ProductNameObj)) {
      this.tmpId = ProductNameObj.tmpId;
      var tmpId = ProductNameObj.tmpId;
      // if (isSet(ReqObj.UserHtml[tmpId])) {
      // ReqObj.UserHtml[tmpId]["ProductSugg"] = true;
      this.addHtmlObjToArray(this.getProductHtml(tmpId));
      // var ProductNameSuffixObj = {
      //   "suffix": "_prodtitle",
      //   "class": ""
      // };
      if (!IsChatbl(tmpId)) {
        var clasnm = isSSB(tmpId)
          ? ssbClass("wrprClass", tmpId)
          : isBlInline(tmpId)
          ? isBlInlineFr(tmpId)
            ? "fmb15"
            : "idsf pfstrt mb20"
          : "porlt";
        var ProductNameSuffixOuterHtml =
          "<div  id='t" + tmpId + "_prodtitle' class='" + clasnm + "'>";
        var ProductNameSuffixClosingHtml = "</div>";
        var ProductNameSuffixHtmlObj = {
          SuffixOuterHtml: ProductNameSuffixOuterHtml,
          SuffixClosingHtml: ProductNameSuffixClosingHtml,
          suffix: "_prodtitle",
        };
  
        this.ProductNameHTML = MakeWrapper(
          [this.ProductNameHtmlObjArray],
          tmpId,
          ProductNameSuffixHtmlObj,
          ""
        );
      } else {
        this.ProductNameHTMLQues = MakeWrapper(
          [this.ProductNameHtmlObjArray],
          tmpId,
          WrapperObj(
            "<div  id='t" + tmpId + "_prodtitle' class = 'cbl_ques cbl_vh'>",
            "</div>",
            "_prodtitle"
          ),
          "ques"
        );
  
        this.ProductNameHTMLInput = MakeWrapper(
          [this.ProductNameHtmlObjArray],
          tmpId,
          WrapperObj(
            "<div class = 'cbl_dtls cbl_prdchng cbl_df t" +
              tmpId +
              "_userInput cbl_br10 dn'>",
            "</div>",
            "_prodtitle"
          ),
          "input"
        );
  
        this.ProductNameHTML =
          this.ProductNameHTMLQues + this.ProductNameHTMLInput;
      }
      // var ProdNameHtml = this.ProductNameHTML;
      // ReqObj.UserHtml[tmpId] = {
      //   "ProductSugg": true,
      //   "ProductName": ProdNameHtml
      // };
      // }
      // else {
      //   ReqObj.UserHtml[tmpId]["ProductSugg"] = false;
  
      //   this.ProductNameHTML = ReqObj.UserHtml[tmpId]["ProductName"];
      // }
      if (this.ProductNameHTML !== "") {
        ReqObj.Form[tmpId].currentclassCount++;
        this.ifHtmlPresent(ProductNameObj, tmpId);
      } else {
        this.ifHtmlNotPresent(ProductNameObj, tmpId);
      }
    }
  };
  
  ProductName.prototype.ifHtmlPresent = function (ProductNameObj, tmpId) {
    ProductNameObj.that.NumberofClassCalled -= 1;
    AttachObject(ProductNameObj.object, tmpId);
    if (isSet(ProductNameObj.AfterService)) {
      for (var i = 0; i < ProductNameObj.AfterService.length; i++) {
        ProductNameObj.that.MakeSeq(ProductNameObj.AfterService[i], tmpId);
      }
    }
    if (ProductNameObj.that.NumberofClassCalled === 0) {
      makeFinalSeq(ProductNameObj, tmpId);
    }
  };
  
  ProductName.prototype.ifHtmlNotPresent = function (ProductNameObj, tmpId) {
    if (ProductNameObj.hasFallback) {
      CreateSeq(ProductNameObj.FallbackObj);
    } else ProductNameObj.that.NumberofClassCalled -= 1;
  };
  
  ProductName.prototype.returnProductInput = function (tmpId, inputclass) {
    var placehold = "Enter Product / Service name";
    var html =
      '<input templateId="' +
      tmpId +
      '" class="' +
      inputclass +
      '" type="text" name="q_title" id="t' +
      tmpId +
      'prodtitle" onblur="" maxlength="100" placeholder="' +
      placehold +
      '" autocomplete="off" spellcheck="true" role="textbox" aria-autocomplete="list" aria-haspopup="true">';
    if (isSSB(tmpId) && !isnewSSB(tmpId)) return '<div class="mb-InCon">' + html;
    return html;
  };
  
  ProductName.prototype.returnProductError = function (
    tmpId,
    formType,
    errorclass
  ) {
    var div =
      '<div class="' +
      errorclass +
      '" id="t' +
      tmpId +
      '_error_title"><div data-role="content"';
    div += isSSB(tmpId)
      ? 'class="mb-ertxt mb-mt10">Enter product/service name</div>'
      :">Enter product/service name</div>";
    return div;
  };
  
  ProductName.prototype.getInput = function (tmpId, formType) {
    this.ProductNameHtmlObj["UserInput"] = IsChatbl(tmpId)
      ? this.returnProductInput(tmpId, "") + "</div>"
      : this.getBlEnqInputHtml(tmpId, formType);
  };
  
  ProductName.prototype.getBlEnqInputHtml = function (tmpId, formType) {
    var html = "";
    html +=
      isSSB(tmpId) || isBlInline(tmpId)
        ? this.returnProductInput(tmpId, "")
        : !pdpInactiveBL(tmpId)
        ? this.returnProductInput(tmpId, "be-slbox inpt_errorbx be-row")
        : this.returnProductInput(
            tmpId,
            "be-slbox inpt_errorbx be-row bed_input cpNm wid_600"
          );
    var errorcls = isSSB(tmpId) ? "" : "beerrp4 bedsnone be-erbx";
    html += this.returnProductError(tmpId, formType, errorcls);
    html += isSSB(tmpId)
      ? isnewSSB(tmpId)
        ? "</div>"
        : "</div></div>"
      : '<a class="be-erarw" data-role="arrow"></a></div>';
    if (isBlInline(tmpId)) {
      var cls = isBlInlineFr(tmpId) ? "flx1" : "pr pflx1";
      html = "<div class = '" + cls + "'>" + html + "</div>";
    }
    return html;
  };
  
  ProductName.prototype.getLabel = function (tmpId, formType) {
    var cls = isBlInline(tmpId) ? isBlInlineFr(tmpId) ? "fs0 wf" : "fs15 cl11" : "be-lbl";
    if (pdpInactiveBL(tmpId)) {
      cls = "be-lbl be-lbl2";
    }
    var label = isBlInline(tmpId) || (isSSB(tmpId) && isnewSSB(tmpId)) ? "I want quotes for" : isSSB(tmpId) ? "Product/Service name"
        : (pdpInactiveBL(tmpId)) ? "Enter Product/Service name <span class='redc'>*</span>" : "Enter Product/Service name";
    this.ProductNameHtmlObj["Label"] = IsChatbl(tmpId)
      ? returnLabel("t" + tmpId, "Please enter Product/Service name", "_name-l","") : isSSB(tmpId)
      ? returnLabel("t" + tmpId, label, "_name-l", ssbClass("label", tmpId))
      : returnLabel("t" + tmpId, label, "_name-l", cls);
  };
  
  ProductName.prototype.getProductHtml = function (tmpId) {
    this.getLabel(tmpId, ReqObj.Form[tmpId].formType.toLowerCase());
    this.getInput(tmpId, ReqObj.Form[tmpId].formType.toLowerCase());
    this.ProductNameHtmlObj["ClosingWrapper"] = "";
    this.ProductNameHtmlObj["OuterWrapper"] = "";
    return this.ProductNameHtmlObj;
  };
  
  ProductName.prototype.displayHtml = function () {
    return IsChatbl(this.tmpId)
      ? [this.ProductNameHTMLQues, this.ProductNameHTMLInput]
      : [this.ProductNameHTML];
  };
  
  ProductName.prototype.handleUI = function (event) {
    var tmpId = event.data.tmpId;
    var todo = event.data.todo;
    if (todo === "default") {
      // if (ReqObj.UserHtml[tmpId]["ProductSugg"])
      this.setTitleSuggester(tmpId);
      $("#t" + tmpId + "_error_title").addClass("bedsnone");
      isSSB(tmpId)
        ? $("#t" + tmpId + "prodtitle").removeClass("mb-erbrd nb-erbrd")
        : $("#t" + tmpId + "prodtitle").removeClass("highlight-err");
      $("#t" + tmpId + "_name-l").removeClass("redc");
      this.showMcatFilled(tmpId);
    }
  };
  
  ProductName.prototype.handleHeading = function (tmpId) {
    if (isOtherEnq(tmpId)) ButtonNameUI(ReqObj.Form[tmpId].currentScreen, tmpId);
  };
  
  ProductName.prototype.defaultEvents = function (tmpId) {
    this.handleUI({
      data: {
        tmpId: tmpId,
        todo: "default",
      },
    });
    this.handleEvents(tmpId);
    $(document)
      .off("click.prodName keypress.prodName keydown.prodName")
      .on(
        "click.prodName keypress.prodName keydown.prodName",
        ".inpt_errorbx",
        function () {
          $("#t" + tmpId + "_error_title").addClass("bedsnone");
          $("#t" + tmpId + "prodtitle").removeClass("highlight-err");
          $("#t" + tmpId + "_name-l").removeClass("redc");
        }
      );
  
    isSSB(tmpId)
      ? $("#t" + tmpId + "prodtitle")
          .off("keyup")
          .on("keyup", function () {
            $("#t" + tmpId + "_error_title").addClass("bedsnone");
            $("#t" + tmpId + "prodtitle").removeClass("mb-erbrd nb-erbrd");
          })
      : "";
  };
  
  ProductName.prototype.handleButton = function (tmpId) {
    if (Bl04(tmpId)) ButtonNameUI(ReqObj.Form[tmpId].currentScreen, tmpId);
  };
  
  function Callblur(event) {
    var keycode = event.keyCode ? event.keyCode : event.which;
    if (
      keycode === 13 &&
      event.target.id === "t" + event.data.param1 + "prodtitle"
    ) {
      if (isSet($("#t" + event.data.param1 + "prodtitle")[0])) {
        var EventArray = $._data(
          $("#t" + event.data.param1 + "prodtitle")[0],
          "events"
        );
        var BLurEvent = isSet(EventArray.blur) ? EventArray.blur : [];
        for (var b = 0; b < BLurEvent.length; b++) {
          BLurEvent[b].handler(BLurEvent[b]);
        }
        HideSuggester();
      }
    }
  }
  
  ProductName.prototype.AddBlur = function (tmpId) {
    var that = this;
    $("#t" + tmpId + "prodtitle")
      .off("blur.blEnqProdNameBlur")
      .on(
        "blur.blEnqProdNameBlur",
        {
          param1: tmpId,
          param2: "blur",
          pnObject: that,
        },
        that.checkMcatIDJquery
      );
  };
  
  ProductName.prototype.RemoveBlur = function (tmpId) {
    $("#t" + tmpId + "prodtitle").off("blur.blEnqProdNameBlur");
  };
  
  ProductName.prototype.handleEvents = function (tmpId) {
    this.IsEnterPressed = false;
    var that = this;
    var BLurEvents = [];
    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    ) {
      ChatblfooterAns(tmpId);
  
      if (ReqObj.Form[tmpId].flags.autofocusPName) {
        $("#t" + tmpId + "prodtitle").focus();
      }
      if (IsChatbl(tmpId)) {
        setTimeout(function () {
          $("#t" + tmpId + "prodtitle").focus();
        }, 1800);
      } else {
        that.AddBlur(tmpId);
  
        // $('#t' + tmpId + 'prodtitle').off("blur.BlEnqEvent").on("blur.BlEnqEvent", { param1: tmpId, param2: "blur", pnObject: that }, that.checkMcatIDJquery);
  
        $("#t" + tmpId + "prodtitle")
          .off("mouseleave.BlEnqEvent")
          .on("mouseleave.BlEnqEvent", function () {
            $("#t" + tmpId + "_cls").each(function () {
              if (
                $(this).css("display") === "block" ||
                $(this).css("display") === "inline-block"
              ) {
                $(this)
                  .off("mouseenter.BlEnqEvent")
                  .on("mouseenter.BlEnqEvent", function (event) {
                    that.RemoveBlur(tmpId);
                  });
                $(this)
                  .off("mouseleave.BlEnqEvent")
                  .on("mouseleave.BlEnqEvent", function () {
                    that.AddBlur(tmpId);
                  });
              }
            });
          });
  
        $(document)
          .off("mouseenter.BlEnqEvent")
          .on(
            "mouseenter.BlEnqEvent",
            ".t" + tmpId + "_prodName",
            function (event) {
              if (
                $(this).css("display") === "block" ||
                $(this).css("display") === "inline-block"
              ) {
                that.RemoveBlur(tmpId);
              }
            }
          );
  
        $(document)
          .off("mouseleave.BlEnqEvent")
          .on("mouseleave.BlEnqEvent", ".t" + tmpId + "_prodName", function () {
            if (
              $(this).css("display") === "block" ||
              $(this).css("display") === "inline-block"
            ) {
              that.AddBlur(tmpId);
            }
          });
  
        var SubmitDisplay = $("#t" + tmpId + "_submit").css("display");
        if (SubmitDisplay === "block" || SubmitDisplay === "inline-block") {
          $("#t" + tmpId + "_submit")
            .off("mouseenter.BlEnqEvent")
            .on("mouseenter.BlEnqEvent", function () {
              that.RemoveBlur(tmpId);
            });
  
          $("#t" + tmpId + "_submit")
            .off("mouseleave.SubmitBtn")
            .on("mouseleave.SubmitBtn", function () {
              that.AddBlur(tmpId);
            });
        }
      }
  
      $("#t" + tmpId + "prodtitle")
        .off("keypress.BlEnqEvent")
        .on("keypress.BlEnqEvent", function (event) {
          var keycode = event.keyCode ? event.keyCode : event.which;
          if (keycode === 13) {
            // if (that.isProdNameChanged)
            //   // RefactorFormArrays(tmpId);
            if (!$("#t" + tmpId + "_submit").is(":disabled")) {
              that.IsEnterPressed = true;
              $("#t" + tmpId + "prodtitle").off("blur");
              HideSuggester();
            }
          }
        });
    }
  };
  
  ProductName.prototype.setTitleSuggester = function (tmpId) {
    // $("#t" + tmpId + "prodtitle").html("");
    var that = this;
    var title_sugg = "sugg_title_" + tmpId;
  
    var title_count = setInterval(function () {
      if (typeof Suggester !== "undefined") {
        var ProductNameSuffix = "_prodName";
        //remove all existing product name suggestor
        $(".t" + tmpId + ProductNameSuffix).each(function () {
          $(this).remove();
        });
        //upto here
        var autocompleteClass = SetAutoCompleteClass(tmpId, ProductNameSuffix);
        var row_num = BlAutoSuggRowNum(tmpId);
        window[title_sugg] = new Suggester({
          element: "t" + tmpId + "prodtitle",
          getQuotation: false,
          onSelect: that.selectTitle,
          fields: "",
          type: "product",
          module: "BL-FORM",
          rowsToDisplay: row_num,
          recentData: 1,
          autocompleteClass: autocompleteClass,
        });
        if (JSON.stringify(title_sugg)) {
          if (
            isSet(tmpId) &&
            isSet(ReqObj.Form[tmpId]) &&
            isSet(ReqObj.Form[tmpId].flags)
          )
            ReqObj.Form[tmpId].flags.isTitleSuggSet = true;
          clearInterval(title_count);
        }
      }
    }, 1000);
  };
  
  ProductName.prototype.selectTitle = function (event, ui) {
    var that = ReqObj.Form[$(this).attr("templateId")].productObject;
    if (isSet(that)) {
      if (isSSB(that.tmpId) && IsBlEnqProdNameChanged(that.tmpId))
        ReqObj.Form[that.tmpId].url.html = false;
      if (
        $("#t" + that.tmpId + "prodtitle").length &&
        ReqObj.Form[that.tmpId].prodName !==
          $("#t" + that.tmpId + "prodtitle").val()
      ) {
        if (isSet(ui) && isSet(ui.item)) {
          if (ui.item.value) {
            $("#t" + that.tmpId + "prodtitle").val(ui.item.value);
            if (IsChatbl(that.tmpId))
              ReqObj.Form[that.tmpId].UserInputs["ProductName"] = ui.item.value;
            ReqObj.Form[that.tmpId].prodName = ui.item.value;
            ReqObj.Form[that.tmpId].prodDispName = "";
            ReqObj.Form[that.tmpId].mcatName = "";
          }
          if (
            isSet(ui.item.mcat_id) &&
            isSet(ui.item.mcat_id[0]) &&
            isSet(ui.item.cat_id) &&
            isSet(ui.item.cat_id[0])
          ) {
            ReqObj.Form[that.tmpId].mcatId = ui.item.mcat_id[0];
            ReqObj.Form[that.tmpId].catId = ui.item.cat_id[0];
            ReqObj.Form[that.tmpId].callLeftSide = false;
            that.getMcatImage(that.tmpId, "select");
            if (isSet(that.tmpId) && that.tmpId.substring(0, 2) === "09")
              AfterFormDefaults(that.tmpId);
            $("#t" + that.tmpId + "prodtitle").focus();
          } else {
            ReqObj.Form[that.tmpId].IsProdNameChanged = true;
            that.getMcatDetail(
              $("#t" + that.tmpId + "prodtitle").val(),
              that.tmpId,
              "select"
            );
          }
        } else {
          ReqObj.Form[that.tmpId].IsProdNameChanged = true;
          that.getMcatDetail(
            $("#t" + that.tmpId + "prodtitle").val(),
            that.tmpId,
            "select"
          );
        }
      }
    }
  };
  
  ProductName.prototype.SaveDetails = function (tmpId, event) {
    if (IsChatbl(tmpId)) {
      ReqObj.Form[tmpId].UserInputs["ProductName"] = $(
        "#t" + tmpId + "prodtitle"
      ).val(); /* for chat bl*/
    }
    //
  };
  
  ProductName.prototype.getMcatImage = function (tmpId) {
    if (
      isSet(tmpId) &&
      isSet(ReqObj.Form[tmpId]) &&
      isSet(ReqObj.Form[tmpId].formType)
    ) {
      //POPUPCHATBL
      var form_type =
        ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
      $("#t" + tmpId + "_imglodr").removeClass("bedsnone");
      ReqObj.Form[tmpId].mcatImage = "";
      if (
        !isSSB(tmpId) &&
        isSet(ReqObj.Form[tmpId].mcatId) &&
        parseInt(ReqObj.Form[tmpId].mcatId) !== -1
      ) {
        getMcatImage(tmpId, "", 1);
      } else if (parseInt(ReqObj.Form[tmpId].mcatId, 10) === -1) {
        ReqObj.Form[tmpId].displayImage = "";
        ReqObj.Form[tmpId].zoomImage = "";
        $("#t" + tmpId + "_imglodr").addClass("bedsnone");
        leftSideTransition(0, tmpId);
      }
    }
  };
  /***
   * Function ID - 2
   *
   * Usage: Function to fetch mcat detail
   *
   * Output: It will set Mcat-ID, Cat-ID, Type in global object
   ***/
  ProductName.prototype.getMcatDetail = function (
    mcatMatch,
    tmpId,
    eventName,
    prdnmObj,
    from
  ) {
    var that = this;
    // /var submit_url = appsServerName + 'models/mcatid-suggestion.php?search_param=' + encodeURIComponent(mcatMatch);
    if (isSet(ReqObj.Form[tmpId].isBlQtutShown)) {
      ReqObj.Form[tmpId].isBlQtutShown = false;
    }
    if (isSet(mcatMatch) && mcatMatch !== "") {
      var submit_url =
        "//apps.imimg.com/models/mcatid-suggestion.php?search_param=" +
        encodeURIComponent(mcatMatch);
      addBlLoader(tmpId, "center");
      ReqObj.Form[tmpId].mcatId = -2;
      if (IsChatbl(tmpId)) {
        $("#t" + tmpId + "prodtitle")
          .prop("disabled", true)
          .addClass("chatblur");
        $("#t" + tmpId + "_submit")
          .prop("disabled", true)
          .addClass("chatblur");
      }
      $.ajax({
        cache: false,
        url: submit_url,
        type: "GET",
        //timeout: 3000,
        dataType: "json",
        success: function (data) {
          if (isSet(data) && data !== "") {
            ReqObj.Form[tmpId].mcatId = isSet(data["mcatid"])
              ? data["mcatid"]
              : -1;
            ReqObj.Form[tmpId].catId = isSet(data["catid"]) ? data["catid"] : -1;
            ReqObj.Form[tmpId].mcatType = isSet(data["type"]) ? data["type"] : "";
            ReqObj.Form[tmpId].prodDispName = "";
            ReqObj.Form[tmpId].mcatName = "";
          } else {
            ReqObj.Form[tmpId].mcatId = -1;
            ReqObj.Form[tmpId].catId = -1;
            ReqObj.Form[tmpId].mcatType = "";
          }
        },
        error: function (o, st, e) {
          ReqObj.Form[tmpId].mcatId = -1;
          ReqObj.Form[tmpId].catId = -1;
          ReqObj.Form[tmpId].mcatType = "";
          return;
        },
        complete: function (res) {
          //this is the case for enter functionality of the form
          ReqObj.Form[tmpId].isProdNameChanged = true;
          addDetachedFlag(tmpId);
          //detachFlag2(tmpId);
          ReqObj.Form[tmpId].cName.prodServ = ReqObj.Form[tmpId].mcatType;
          if (IsChatbl(tmpId)) {
            $("#t" + tmpId + "prodtitle")
              .prop("disabled", false)
              .removeClass("chatblur");
            $("#t" + tmpId + "_submit")
              .prop("disabled", false)
              .removeClass("chatblur");
          }
          if (StaticQuesForeignUser(tmpId)) {
            if (ReqObj.Form[tmpId].mcatType.toLowerCase() === "p")
              ReqObj.Form[tmpId].modrefType = "product";
            else ReqObj.Form[tmpId].modrefType = "company";
          }
          removeBLLoader(tmpId, "center");
          if (isBl(tmpId) || isSSB(tmpId)) {
            savenem(tmpId);
            if (isSet(ReqObj.Form[tmpId].ReqDtlBox))
              ReqObj.Form[tmpId].ReqDtlBox = "";
            if (
              isSet(ReqObj.Form[tmpId].userFilledIsq) &&
              ReqObj.Form[tmpId].userFilledIsq.length
            )
              ReqObj.Form[tmpId].userFilledIsq = [];
            if (isSSB(tmpId) && currentISO() == "IN") savemc(tmpId);
          }
          if (that.isProdNameChanged) {
            DirectSubmitWithoutBlur(tmpId);
          }
          ReqObj.Form[tmpId].prodName = mcatMatch;
          ReqObj.Form[tmpId].callLeftSide = false;
          if (IsChatbl(tmpId)) {
            "" !== ReqObj.Form[tmpId].mcatName
              ? updateChatBlProdName(tmpId)
              : $(".productname").text(ReqObj.Form[tmpId].prodName); //
          }
  
          that.getMcatImage(tmpId);
          if (isSet(prdnmObj)) PostAjax(prdnmObj, tmpId);
  
          if (
            isSet(eventName) &&
            (eventName === "blur" || eventName === "select")
          ) {
            ReqObj.Form[tmpId].flags.autofocusPName = true;
            if (
              $("#t" + tmpId + "prodtitle").length > 0 &&
              $("#t" + tmpId + "prodtitle").val() === mcatMatch
            ) {
              if (!IsChatbl(tmpId)) {
                if (isBl(tmpId) && NEC()) {
                  ReqObj.Form[tmpId].flags.isNECShown = false;
                }
                AfterFormDefaults(tmpId);
                // if (tmpId.substring(0, 2) === "09")
  
                // // OpenForm(ReqObj.Form[tmpId]);
                // else InlineForm(ReqObj.Form[tmpId]);
              } else {
                GetIsqFromService(tmpId);
              }
            }
  
            // if (!IsChatbl(tmpId)) $('#t' + that.tmpId + 'prodtitle').focus();
            // $('#t' + that.tmpId + 'prodtitle').focus();
  
            if (IsChatbl(tmpId)) {
              // $('#t' + that.tmpId + 'prodtitle').off("focus");
              // $('#t' + that.tmpId + 'prodtitle').focus();
              // that.setTitleSuggester(that.tmpId);
            }
          }
  
          //}
        },
      });
    }
  };
  
  ProductName.prototype.showMcatFilled = function (tmpId) {
    var name = "";
    if (ReqObj.Form[tmpId].prodName !== "") {
      if (
        typeof ReqObj.Form[tmpId].prodServ !== "undefined" &&
        ReqObj.Form[tmpId].prodServ !== "C"
      ) {
        name = ReqObj.Form[tmpId].prodName;
      } else if (
        ReqObj.Form[tmpId].prodServ === "C" &&
        ReqObj.Form[tmpId].formType === "BL"
      )
        name = ReqObj.Form[tmpId].prodName;
    }
    if (!IsChatbl(tmpId))
      if (isSSB(tmpId) && ReqObj.Form[tmpId].flags.prodSecNochange) {
        ReqObj.Form[tmpId].flags.prodSecNochange = false;
      } else {
        $("#t" + tmpId + "prodtitle").val(name);
        /*if(isSSB(tmpId) && isnewSSB(tmpId) && $('#t' + tmpId + 'prodtitle').val() !== "")
        $('#t' + tmpId + 'prodtitle').parent().addClass("focused");*/
      }
  };
  
  ProductName.prototype.onSubmit = function (tmpId) {
    var that = this;
    var prdnmObj = PreAjax("ProductName", tmpId);
    if (IsBlEnqProdNameChanged(tmpId)) {
      this.isProdNameChanged = true;
    }
    if (pdpInactiveBL(tmpId)) {
      $("#recommendProd").css({
        display: "none",
      });
      $("#t" + tmpId + "_helpQuest").css({
        display: "block",
      });
    }
  
    this.checkMcatID(
      {
        param1: tmpId,
        param2: "submit",
      },
      prdnmObj
    );
  };
  
  ProductName.prototype.validate = function (tmpId, event) {
    var form_type =
      ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
    var productName = $("#t" + tmpId + "prodtitle").val();
    if (!isSet(validation)) createGlobalObject();
    var isProductNameValid = validation.isProductNameValid(productName);
    var StepNumber = ReqObj.Form[tmpId].FormSequence.StepCounter + 1;
    if (isProductNameValid["type"] === false) {
      blenqGATracking(form_type,"Validation_Error_Prd_Title|" + StepNumber + "|ProductName",getEventLabel(),1,tmpId);
      if (IsChatbl(tmpId)) {
        addChatblError(tmpId, isProductNameValid.error);
      } else {
        var errorcls = isSSB(tmpId)
          ? isnewSSB(tmpId)
            ? "nb-erbrd"
            : "mb-erbrd"
          : "highlight-err";
        $("#t" + tmpId + "_error_title")
          .removeClass("bedsnone")
          .focus();
        var prderrm = isProductNameValid["specialcase"]
          ? "Enter valid product/service name"
          : "Enter product/service name";
        $("#t" + tmpId + "_error_title")
          .children("div")
          .first()
          .text(prderrm);
        $("#t" + tmpId + "prodtitle").addClass(errorcls);
        isSSB(tmpId) ? $("#t" + tmpId + "prodtitle").focus() : "";
      }
      if (!isSSB(tmpId) && !IsChatbl(tmpId))
        $("#t" + tmpId + "_name-l").addClass("redc");
      ReqObj.Form[tmpId].validateArray.push("t" + tmpId + "prodtitle");
      return false;
    } else {
      // var isMandatory = true;
      // return IsTNCChecked(tmpId, isMandatory, usercookie.getParameterValue(imeshExist(), "fn"));
      return true;
    }
  };
  
  ProductName.prototype.checkMcatIDJquery = function (event) {
    event.data.pnObject.checkMcatID(event.data);
  };
  
  ProductName.prototype.checkMcatID = function (eventData, prdnmObj) {
    var tmpId = eventData.param1;
    var eventName = eventData.param2;
    if (isScriptTag($("#t" + tmpId + "prodtitle").val())) {
      if (IsChatbl(tmpId)) {
        addChatblError(tmpId, isProductNameValid.error);
      } else {
        var errorcls = isSSB(tmpId)
          ? isnewSSB(tmpId)
            ? "nb-erbrd"
            : "mb-erbrd"
          : "highlight-err";
        $("#t" + tmpId + "_error_title")
          .removeClass("bedsnone")
          .focus();
        var prderrm = "Enter valid product/service name";
        $("#t" + tmpId + "_error_title")
          .children("div")
          .first()
          .text(prderrm);
        $("#t" + tmpId + "prodtitle").addClass(errorcls);
        isSSB(tmpId) ? $("#t" + tmpId + "prodtitle").focus() : "";
      }
      if (!isSSB(tmpId) && !IsChatbl(tmpId))
        $("#t" + tmpId + "_name-l").addClass("redc");
  
      return;
    }
  
    if (IsBlEnqProdNameChanged(tmpId)) {
      this.getMcatDetail(
        $("#t" + tmpId + "prodtitle").val(),
        tmpId,
        eventName,
        prdnmObj
      );
    } else {
      if (isSet(prdnmObj)) PostAjax(prdnmObj, tmpId);
    }
  };
  
  function IsBlEnqProdNameChanged(tmpId) {
    if (isSet(tmpId)) {
      if (
        $("#t" + tmpId + "prodtitle").length &&
        $("#t" + tmpId + "prodtitle").val() !== "" &&
        $("#t" + tmpId + "prodtitle").val() !== "Enter product/service name" &&
        ReqObj.Form[tmpId].prodName !== $("#t" + tmpId + "prodtitle").val()
      ) {
        ReqObj.Form[tmpId].populate = false;
        return true;
      } else {
        ReqObj.Form[tmpId].populate = true;
        return false;
      }
    }
  }
  
  function RequirementDtl(tmpId) {
    this.className = "RequirementDtl";
    this.RequirementDtlObj = {
      OuterWrapper: "",
      UserInput: "",
      ClosingWrapper: "",
      Label: "",
    };
    this.Rdbox = "";
    this.setValue = "";
    this.countclick = 0;
    this.QuestionArray = [];
  }
  
  RequirementDtl.prototype.hasHtml = function (RdObj) {
    if (isSet(RdObj)) {
      ReqObj.Form[RdObj.tmpId].ReqDtl.HasHtmlCalled = true; // whether hashtml called or not.
      if (this.getHtml(RdObj.tmpId) !== "") {
        ReqObj.Form[RdObj.tmpId].flags.isReqHtmlPresent = true;
        if (
          isSet(RdObj.object.countlastUpdated) &&
          RdObj.object.countlastUpdated === false
        )
          ReqObj.Form[RdObj.tmpId].currentclassCount++;
        this.ifHtmlPresent(RdObj);
      } else {
        ReqObj.Form[RdObj.tmpId].flags.isReqHtmlPresent = false;
        this.ifHtmlNotPresent(RdObj);
      }
    }
  };
  
  RequirementDtl.prototype.displayHtml = function (tmpId) {
    if (isSet(tmpId)) {
      ReqObj.Form[tmpId].flags.isDescDivShown = true;
      this.getHtml(tmpId);
      if (!IsChatbl(tmpId)) {
        var clsnm = isSSB(tmpId)
          ? ssbClass("wrprClass", tmpId)
          : isBlInline(tmpId)
          ? isBlInlineFr(tmpId)
            ? "fmb15"
            : "idsf pfstrt mb20 inTxAr"
          : pdpInactiveBL(tmpId)
          ? "bepdpreq bemb10 bemt5"
          : "bepdpreq bemt15 ";
        var cdiv =
          isSSB(tmpId) ||
          (ReqObj.Form[tmpId].formType.toLowerCase() === "enq" &&
            tmpId.substring(0, 2) === "09")
            ? "<div id='t" + tmpId + "_cdiv'></div>"
            : "";
        if (
          ReqObj.Form[tmpId].FormSequence.StepCounter === 0 &&
          isImageVidEnq(tmpId)
        )
          cdiv = "";
        var RequirementDtlSuffixHtmlObj = {
          SuffixOuterHtml:
            "<div  id='t" + tmpId + "_reqbox' class='" + clsnm + "'>",
          SuffixClosingHtml: "</div>" + cdiv,
          suffix: "_reqbox",
        };
        this.Rdbox = MakeWrapper(
          [[this.RequirementDtlObj]],
          tmpId,
          RequirementDtlSuffixHtmlObj,
          ""
        );
      } else {
        this.RdboxQues = MakeWrapper(
          [[this.RequirementDtlObj]],
          tmpId,
          WrapperObj(
            "<div  id='t" + tmpId + "_reqbox' class='cbl_ques cbl_vh'>",
            "</div>",
            "_reqbox"
          ),
          "ques"
        );
  
        this.RdboxInput = MakeWrapper(
          [[this.RequirementDtlObj]],
          tmpId,
          WrapperObj(
            "<div  id='t" +
              tmpId +
              "_reqboxInput ' class='cbl_dtls cbl_name cbl_df t" +
              tmpId +
              "_userInput cbl_br10 dn'>",
            "</div>",
            "_reqbox"
          ),
          "input"
        );
  
        this.Rdbox = this.RdboxQues + this.RdboxInput;
  
        return [this.RdboxQues, this.RdboxInput];
      }
  
      return [this.Rdbox];
    }
  };
  RequirementDtl.prototype.ifHtmlPresent = function (RdObj) {
    RdObj.that.NumberofClassCalled -= 1;
    AttachObject(RdObj.object, RdObj.tmpId);
    if (isSet(RdObj.AfterService)) {
      for (var i = 0; i < RdObj.AfterService.length; i++) {
        RdObj.that.MakeSeq(RdObj.AfterService[i], RdObj.tmpId);
      }
    }
    if (RdObj.that.NumberofClassCalled === 0) {
      makeFinalSeq(RdObj, RdObj.tmpId);
    }
  };
  
  RequirementDtl.prototype.ifHtmlNotPresent = function (RdObj) {
    if (RdObj.hasFallback) {
      CreateSeq(RdObj.FallbackObj);
    }
  };
  
  RequirementDtl.prototype.getHtml = function (tmpId) {
    this.getInput(tmpId);
    this.getLabel(tmpId);
  };
  
  RequirementDtl.prototype.getPrefilledText = function (tmpId) {
    var text = "Hi," + "\n";
    if (ReqObj.Form[tmpId].modrefType.toLowerCase() === "product") {
      text += "I am interested in buying " + ReqObj.Form[tmpId].prodName;
    } else {
      text +=
        "I am looking for service provider for " + ReqObj.Form[tmpId].prodName;
    }
    text += "\n" + "Kindly send me quotations.";
  
    return text;
  };
  
  RequirementDtl.prototype.getInput = function (tmpId) {
    //fghdjhggg
    var input = "";
    var placeholdertext = this.getPlaceHolderText(tmpId);
    if (IsChatbl(tmpId)) {
      input +=
        "<input class='cbl_name cbl_txt' id = 't" +
        tmpId +
        "_reqBoxTemplates' placeholder='" +
        placeholdertext +
        "'></input>";
      // only for RequirementDtl input
      if (ReqObj.Form[tmpId].currentScreen === "RequirementDtl") {
        var FormId = "#t" + tmpId + "_newblchatReply";
        if ($(FormId).children(".cbl_resend.cbl_skip")) {
          $(FormId).children(".cbl_resend.cbl_skip").remove();
        }
        input += skipDiv1(tmpId); //chat bl bug
      }
    } else {
      var stickycss = isSticky(tmpId) ? "FM_be-slbox" : "be-slbox";
      var cls =
        ReqObj.Form[tmpId].formType.toLowerCase() === "bl" &&
        tmpId.substr(0, 2) !== "01" &&
        currentISO() !== "IN"
          ? stickycss + " be-txtarea blFh90"
          : stickycss + " be-txtarea";
      
      if(pdpInactiveBL(tmpId)){
          cls += " cpNm cbl_br8 wid_600"
      }
      input += isSSB(tmpId)
        ? isnewSSB(tmpId)
          ? "<textarea type='text'  id='t" +
            tmpId +
            "_reqBoxTemplates' placeholder='" +
            placeholdertext +
            "'></textarea>"
          : "<div class='mb-InCon'><textarea type='text'  id='t" +
            tmpId +
            "_reqBoxTemplates' placeholder='" +
            placeholdertext +
            "'></textarea></div>"
        : isBlInline(tmpId) && !isBlInlineFr(tmpId)
        ? returnContainer("", "", "pflx1", "", "", "") +
          returnContainer("", "", "pr", "", "", "") +
          "<textarea  id='t" +
          tmpId +
          "_reqBoxTemplates' placeholder='" +
          placeholdertext +
          "'></textarea></div>"
        : returnContainer("", "", "betarea", "", "", "") +
          returnTextarea("t" + tmpId, "_reqBoxTemplates", cls, placeholdertext);
    }
  
    input += "</div>";
    this.RequirementDtlObj["UserInput"] = input;
  };
  
  RequirementDtl.prototype.getPlaceHolderText = function (tmpId) {
    if (isBlInline(tmpId) || (isSSB(tmpId) && isnewSSB(tmpId))) {
      return "Additional details about your requirement...";
    }
    if (currentISO() !== "IN") {
      /*if(isSSB(tmpId) && isnewSSB(tmpId))
      return "";*/
      if (IsChatBLInline(tmpId)) return "You can enter specific details here..";
      return "Briefly describe what you are looking to buy...";
    }
    if (isOtherEnq(tmpId)) {
      return "Additional details about your requirement...";
    }
    if (IsChatbl(tmpId)) {
      return "You can enter specific details here...";
    } else if (currentISO() === "IN") {
      return "";
    }
    return "";
  };
  
  RequirementDtl.prototype.getLabel = function (tmpId) {
    if (!IsChatbl(tmpId))
      this.RequirementDtlObj["Label"] =
        "<div class='be-erbx beerrp6 bedsnone' id='t" +
        tmpId +
        "_textarea_error'><div id='t" +
        tmpId +
        "_textarear_cont' data-role='content'>Please enter your requirement in Detail</div><a class='be-erarw' data-role='arrow'></a></div>";
    var LabelObj = {
      lblClass: isBlInline(tmpId)
        ? isBlInlineFr(tmpId)
          ? "fs15 cl11 wf"
          : ""
        : isSticky(tmpId)
        ? "FM_be-lbl"
        : "be-lbl",
      labelId: "t" + tmpId + "_textarea",
      QuestionDesc: isBlInline(tmpId)
        ? "Briefly describe your requirement"
        : "Requirement Details",
      flag: "1",
    };
    if (
      isOtherEnq(tmpId) &&
      tmpId.substring(0, 2) === "09" &&
      (ReqObj.Form[tmpId].disableIsq === "1" ||
        ReqObj.Form[tmpId].IsqArray === [] ||
        ReqObj.Form[tmpId].IsqArray === null)
    )
      LabelObj["QuestionDesc"] = "Write your message here";
    this.RequirementDtlObj["Label"] = isSSB(tmpId)
      ? "<label class='" +
        ssbClass("reqBxLbl", tmpId) +
        "'>" +
        LabelObj["QuestionDesc"] +
        "</label>"
      : MakeLabel(LabelObj, "", tmpId);
  };
  
  RequirementDtl.prototype.resetClass = function (tmpId) {
    ReqObj.Form[tmpId].flags.isDescDivShown = false;
    if (ReqObj.Form[tmpId].flags.isDescDivShown) {
      ReqObj.Form[tmpId].prevCount -= ReqObj.Form[tmpId].IsqStepN; //isqstepn
    } else {
      ReqObj.Form[tmpId].prevCount -= ReqObj.Form[tmpId].IsqStep1; //isqstep1
    }
  };
  
  RequirementDtl.prototype.defaultEvents = function (tmpId) {
    if (isSet(tmpId)) {
      this.handleUI({
        data: {
          tmpId: tmpId,
          todo: "defaults",
          obj: this,
        },
      });
      ChatblfooterAns(tmpId);
      var RdEl = $("#t" + tmpId + "_reqBoxTemplates");
      if (StaticQuesForeignUser(tmpId) && !IsChatbl(tmpId)) {
        var attrdiv = $("#t" + tmpId + "_reqBoxTemplates").attr("isqattr");
        if (attrdiv === "true") {
          RdEl.height(100);
          RdEl.css("line-height", "16px");
        } else RdEl.height(80);
      }
      if (isSet(ReqObj.Form[tmpId].ReqDtlBox)) {
        RdEl.text(ReqObj.Form[tmpId].ReqDtlBox);
      } else {
        ReqObj.Form[tmpId].ReqDtlBox = "";
      }
      RdEl.off("blur").on("blur", function (event) {
        ReqObj.Form[tmpId].ReqDtlBox = $("#t" + tmpId + "_reqBoxTemplates").val();
      });
      if (ReqObj.Form[tmpId].afflId === "-126")
        currentISO() !== "IN"
          ? RdEl.attr(
              "placeholder",
              "Briefly describe what you are looking to buy..."
            )
          : RdEl.attr("placeholder", "Type your message here...");
      RdEl.on("focus", function () {
        var errorcls = isSSB(tmpId)
          ? isnewSSB(tmpId)
            ? "nb-erbrd"
            : "mb-erbrd"
          : "highlight-err";
        RdEl.removeClass(errorcls);
        $("#t" + tmpId + "_reqBoxTemplates_err").addClass("bedsnone");
        $("#t" + tmpId + "_textarea").removeClass("redc");
        $("#t" + tmpId + "_textarea_error").addClass("bedsnone");
      });
      if (IsChatbl(tmpId)) {
        setTimeout(function () {
          RdEl.focus();
        }, 1800);
      }
    }
    if (
      !Enq09(tmpId) ||
      (Enq09(tmpId) &&
        $("#t" + tmpId + "_reqbox").length > 0 &&
        currentISO() !== "IN")
    )
      manipulateWidth(tmpId, ReqObj.Form[tmpId].cName.cnameId);
    if (
      (isSSB(tmpId) ||
        (isImageVidEnq(tmpId) &&
          (ReqObj.Form[tmpId].isQtutShown === true ||
            (ReqObj.Form[tmpId].isQtutShown === false &&
              ReqObj.Form[tmpId].cName.qtut === false)))) &&
      currentISO() !== "IN"
    )
      if (!Enq09(tmpId)) onCName(tmpId, "", "rbox");
    if (isSSB(tmpId)) onURLName(tmpId);
    get_buyer_info(tmpId);
    if (imeshExist() !== "" && !pdpInactiveBL(tmpId))
      $("#t" + tmpId + "_leftR").removeClass("lftMgn");
  };
  
  RequirementDtl.prototype.EventIfScreenPresent = function (tmpId) {
    if (isOtherEnq(tmpId)) {
      this.handleHeading(tmpId);
      ButtonNameUI("isq", tmpId);
    }
    //onCName(tmpId);
  };
  
  RequirementDtl.prototype.handleHeading = function (tmpId) {
    ReqObj.Form[tmpId].ctaheadingappend = false;
    if (ReqObj.Form[tmpId].formType.toLowerCase() !== "enq")
      $("#t" + tmpId + "_hdg")
        .removeClass("bedsnone")
        .html(getFormHeading(tmpId, ReqObj.Form[tmpId].currentScreen));
    else {
      if (
        isMoglixUi(tmpId) &&
        ReqObj["Form"][tmpId].currentScreen != "userverification" &&
        $("#t" + tmpId + "OtpMainHeading").is(":visible")
      )
        $("#t" + tmpId + "OtpMainHeading").remove();
      if (
        ReqObj.Form[tmpId].currentScreen.toLowerCase() === "isqrequirementdtl" ||
        ReqObj.Form[tmpId].currentScreen.toLowerCase() ===
          "isqrequirementdtlmoredetails"
      ) {
        if (
          $("#isq_first_screen").attr("type") === "hidden" &&
          $("#isq_first_screen").attr("value") === "Screen1"
        ) {
          if (ReqObj.Form[tmpId].IsqLength < 3) {
            ReqObj.Form[tmpId].ctaheadingappend =
              ReqObj.Form[tmpId].FormSequence.StepCounter === 0 ? true : false;
            if (
              isImageVidEnq(tmpId) &&
              ReqObj.Form[tmpId].FormSequence.StepCounter === 0
            )
              $("#t" + tmpId + "_hdg")
                .addClass("bedsnone")
                .html("");
            else
              $("#t" + tmpId + "_hdg")
                .removeClass("bedsnone")
                .html(getFormHeading(tmpId, "Isq"));
          } else {
            if (
              isImageVidEnq(tmpId) &&
              ReqObj.Form[tmpId].FormSequence.StepCounter === 0
            )
              $("#t" + tmpId + "_hdg")
                .addClass("bedsnone")
                .html("");
            else {
              $("#t" + tmpId + "_hdg")
                .removeClass("bedsnone")
                .html(getFormHeading(tmpId, "isqrequirementdtl"));
            }
          }
        } else
          $("#t" + tmpId + "_hdg")
            .removeClass("bedsnone")
            .html(getFormHeading(tmpId, "isqrequirementdtl"));
      } else if (
        ReqObj.Form[tmpId].currentScreen.toLowerCase() === "requirementdtl" ||
        ReqObj.Form[tmpId].currentScreen.toLowerCase() ===
          "requirementdtlrequirementdtl" ||
        ReqObj.Form[tmpId].currentScreen.toLowerCase() ===
          "requirementdtlmoredetails"
      ) {
        if (
          $("#isq_first_screen").attr("type") === "hidden" &&
          $("#isq_first_screen").attr("value") === "Screen1"
        )
          $("#t" + tmpId + "_hdg")
            .removeClass("bedsnone")
            .html(getFormHeading(tmpId, "isqrequirementdtl"));
        else
          $("#t" + tmpId + "_hdg")
            .removeClass("bedsnone")
            .html(getFormHeading(tmpId, "requirementdtl"));
      }
    }
  };
  
  RequirementDtl.prototype.handleButton = function (tmpId) {
    ButtonNameUI("requirementdtl", tmpId);
  };
  
  RequirementDtl.prototype.handleEvents = function (event) {};
  
  RequirementDtl.prototype.handleUI = function (event) {
    var tmpId = event.data.tmpId;
    var todo = event.data.todo;
    var obj = event.data.obj;
    if (todo === "defaults") {
      if (obj.setValue === "yes") {
        if ($("#t" + tmpId + "_reqBoxTemplates").val() === "") {
        }
      }
    }
  };
  
  RequirementDtl.prototype.validate = function (tmpId) {
    if (isSet(tmpId) && isSet(ReqObj.Form[tmpId])) {
      var sel = $("#t" + tmpId + "_reqBoxTemplates");
      if (!isSet(validation)) createGlobalObject();
      var description = validation.isDescriptionFilled(sel.val());
      if (description["type"] === false) {
        // this.fireTracking({
        //   data: {
        //     tmpId: tmpId,
        //     todo: "default",
        //   },
        // });
        if (
          !$("#t" + tmpId + "_reqBoxTemplates_err").length &&
          !IsChatbl(tmpId)
        ) {
          var html = "";
          var cls = isMoglixUi(tmpId) ? "be-erbx beerrp" : "texterr errpdg";
          html += returnContainer(
            "t" + tmpId,
            "_reqBoxTemplates_err",
            cls,
            "",
            ""
          );
          html += returnContainer(
            "t" + tmpId,
            "_reqBoxTemplates_errmsg",
            "",
            "content",
            ""
          );
          html += "</div>" + description["error"] + "</div>";
          sel.after(html);
        }
        if (IsChatbl(tmpId)) {
          addChatblError(tmpId, description["error"]);
        } else {
          $("#t" + tmpId + "_reqBoxTemplates_err").removeClass("bedsnone");
          var errorcls = isSSB(tmpId)
            ? isnewSSB(tmpId)
              ? "nb-erbrd"
              : "mb-erbrd"
            : "highlight-err";
          sel.addClass(errorcls);
          if (
            new RegExp("isq").test(ReqObj.Form[tmpId].currentScreen.toLowerCase())
          )
            ReqObj.Form[tmpId].isret++;
          //(isSSB(tmpId)) ? sel.focus() : "";
        }
        return false;
      } else return true;
    }
  
    return true;
  };
  
  RequirementDtl.prototype.fireTracking = function (event) {
    var todo = event.data.todo;
    var tmpId = event.data.tmpId;
  
    var form_type =
      ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
    if (todo === "default") {
      var StepNumber = ReqObj.Form[tmpId].FormSequence.StepCounter + 1;
      blenqGATracking(form_type,"Validation_Error_Desc|" + StepNumber + "|RequirementDetail",getEventLabel(),0,tmpId);
    }
    if (todo === "onsuggselect") {
      var text = event.data.text;
      var prodName =
        ReqObj.Form[tmpId].modrefType.toLowerCase() === "product"
          ? ReqObj.Form[tmpId].prodName
          : ReqObj.Form[tmpId].mcatName;
      blenqGATracking(form_type,"|Suggselected-" + text + "|mcat-" + prodName,getEventLabel(),0,tmpId);
    }
  };
  
  RequirementDtl.prototype.SaveDetails = function (tmpId) {
    if (isSet(tmpId)) {
      ReqObj.Form[tmpId].ReqDtlBox = $("#t" + tmpId + "_reqBoxTemplates").val();
      if (isSet(ReqObj.Form[tmpId].ReqDtlBox) && ReqObj.Form[tmpId].ReqDtlBox)
        ReqObj.Form[tmpId].ReqDtlBox = ReqObj.Form[tmpId].ReqDtlBox.trim();
      var type = isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn !== "" && ReqObj.UserDetail.uv !== "V" && isSecondEnq(tmpId) ? "intent" : "";
      if ( Enq04(tmpId) && ReqObj.Form[tmpId].intentCalled === false && imeshExist() !== "")
        toFireGeneration(tmpId, type);
    }
  };
  
  RequirementDtl.prototype.displayAnswer = function (tmpId) {
    var ReqBoxAns = NotFilled;
    if (isSet(ReqObj.Form[tmpId].ReqDtlBox) && ReqObj.Form[tmpId].ReqDtlBox)
      ReqBoxAns = ReqObj.Form[tmpId].ReqDtlBox;
    var classtotest = chatBlClass(tmpId, "right");
    var leftright = IsChatbl(tmpId) ? "cbl_ansr" : "";
    return [
      ConversationRightWrapper(tmpId, ReqBoxAns, {
        classtotest: classtotest,
        leftright: leftright,
      }),
    ];
  };
  
  RequirementDtl.prototype.getData = function (tmpId) {
    var data = {
      offer_id: ReqObj.Form[tmpId].generationId,
      s_glusrid: usercookie.getParameterValue(imeshExist(), "glid"),
      modid: ReqObj.Form[tmpId].modId,
      blEnqFlag: IsChatbl(tmpId) ? "BL" : ReqObj.Form[tmpId].formType,
    };
    var Comma =
      trimVal(ReqObj.Form[tmpId].ReqDtlBox) !== "" &&
      trimVal(ReqObj.Form[tmpId].EnrichmentVal) !== ""
        ? ", "
        : "";
    data["enrichDesc"] =
      ReqObj.Form[tmpId].ReqDtlBox + Comma + ReqObj.Form[tmpId].EnrichmentVal;
    if (
      isSet(ReqObj.Form[tmpId].formType) &&
      ReqObj.Form[tmpId].formType.toLowerCase() === "enq"
    ) {
      data["r_glusrid"] = ReqObj.Form[tmpId].rcvGlid;
      data["q_dest"] = ReqObj.Form[tmpId].query_destination;
    }
    return ObjectTrim(data);
  };
  
  RequirementDtl.prototype.onSubmit = function (tmpId, after) {
    if (isSet(tmpId)) {
      var data = this.getData(tmpId);
      var PreRdObj =
        isSet(after) && after === true ? "" : PreAjax("RequirementDtl", tmpId);
      var hitfinserv = "";
  
      $("#yajaca").hide(); // click away message on pns form
  
      if (
        ReqObj.Form[tmpId].ReqDtlBox &&
        ValidGenId(ReqObj.Form[tmpId].generationId)
      ) {
        if (isBl(tmpId) && ReqObj.Form[tmpId].flags.isEnrichCalled) return;
        ReqObj.Form[tmpId].waitFinServ += 1;
        ReqObj.Form[tmpId].flags.isEnrichCalled = true;
        fireAjaxRequest({
          data: {
            ga: {
              s: true,
              f: true,
              gatype: "saveEnrichment",
              source: "",
            },
            tmpId: tmpId,
            ajaxObj: {
              obj: PreRdObj,
              s: {
                ss: 1,
                sf: {
                  af: 1,
                  pa: 0,
                },
                f: 1,
              },
              f: {
                f: 1,
              },
            },
            ajaxtimeout: 0,
            ajaxdata: data,
            hitfinserv: hitfinserv,
            type: 1,
          },
        });
      } else PostAjax(PreRdObj, tmpId);
    }
  };
  
