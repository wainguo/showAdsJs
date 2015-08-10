wain_ad_url = '';
wain_random = (new Date()).getTime();
wain_org_error_handler = window.onerror;
 
function quoted(str) {
  return (str != null) ? '"' + str + '"' : '""';
}
 
function wain_encodeURIComponent(str) {
  if (typeof(encodeURIComponent) == 'function') {
    return encodeURIComponent(str);
  } else {
    return escape(str);
  }
}
 
function wain_write_tracker(tracker_event) {
  var img_url = window.wain_ad_url.replace(/pagead\/ads/, 'pagead/imp.gif');
  var img_src = img_url + '&event=' + tracker_event;
  var img_tag = '<i' + 'mg height="1" width="1" border="0" ' +
                'src=' + quoted(img_src) +
                ' />';

    //console.log(img_tag);
    document.write(img_tag);
}
 
function wain_append_url(param, value) {
  if (value) {
    window.wain_ad_url += '&' + param + '=' + value;
  }
}
 
function wain_append_url_esc(param, value) {
  if (value) {
    wain_append_url(param, wain_encodeURIComponent(value));
  }
}
 
function wain_append_color(param, value) {
  if (value && typeof(value) == 'object') {
    value = value[window.wain_random % value.length];
  }
  wain_append_url('color_' + param, value);
}
 
function wain_show_ad() {
    var w = window;
    w.onerror = w.wain_org_error_handler;

    if (w.wain_num_ad_slots) {
        w.wain_num_ad_slots = w.wain_num_ad_slots + 1;
    } else {
        w.wain_num_ad_slots = 1;
    }

    if (w.wain_num_ad_slots > 3) {
        return;
    }

    w.wain_ad_url = 'http://ad.wiware.cn/pv?';
    w.wain_ad_client = w.wain_ad_client.toLowerCase();
    if (w.wain_ad_client.substring(0,3) != 'ca-') {
        w.wain_ad_client = 'ca-' + w.wain_ad_client;
    }
    w.wain_ad_url += 'client=' + escape(w.wain_ad_client) +
                     '&random=' + w.wain_random;

    wain_append_url('select', w.wain_ad_select);
    wain_append_url('lmt', w.wain_last_modified_time);

    if (w.wain_ad_format) {
        wain_append_url_esc('format', w.wain_ad_format.toLowerCase());
    }

    wain_append_url('output', w.wain_ad_output);
    if (w.wain_ad_channel) {
        wain_append_url_esc('channel', w.wain_ad_channel.toLowerCase());
    }
    wain_append_url_esc('url', w.wain_page_url);
    wain_append_color('bg', w.wain_color_bg);
    wain_append_color('text', w.wain_color_text);
    wain_append_color('link', w.wain_color_link);
    wain_append_color('url', w.wain_color_url);
    wain_append_color('border', w.wain_color_border);
    wain_append_color('line', w.wain_color_line);
    wain_append_url('ad_type', w.wain_ad_type);

    w.wain_ad_url = w.wain_ad_url.substring(0, 1000);
    w.wain_ad_url = w.wain_ad_url.replace(/%\w?$/, '');

//    默认屏幕宽度
    if( !w.wain_ad_width) w.wain_ad_width = document.body.clientWidth;
    if( !w.wain_ad_height) w.wain_ad_height = document.body.clientHeight;

    if (wain_ad_output == 'html') {
        if (w.name == 'wain_ads_frame') {
            wain_write_tracker('reboundredirect');
        } else {
            document.write('<ifr' + 'ame' +
                         ' name="wain_ads_frame"' +
                         ' width=' + quoted(w.wain_ad_width) +
                         ' height=' + quoted(w.wain_ad_height) +
                         ' frameborder=' + quoted(w.wain_ad_frameborder) +
                         ' src=' + quoted(w.wain_ad_url) +
                         ' marginwidth="0"' +
                         ' marginheight="0"' +
                         ' vspace="0"' +
                         ' hspace="0"' +
                         ' allowtransparency="true"' +
                         ' scrolling="no">');
            wain_write_tracker('noiframe');
            document.write('</ifr' + 'ame>');
        }
    } else if (wain_ad_output == 'js' && w.wain_ad_request_done) {
       document.write('<scr' + 'ipt language="JavaScript1.1"' +
           ' src=' + quoted(wain_ad_url) +
           '></scr' + 'ipt>');
    }
 
    w.wain_ad_select = null;
    w.wain_ad_frameborder = null;
    w.wain_ad_format = null;
    w.wain_page_url = null;
    w.wain_ad_output = null;
    w.wain_ad_channel = null;
    w.wain_color_bg = null;
    w.wain_color_text = null;
    w.wain_color_link = null;
    w.wain_color_url = null;
    w.wain_color_border = null;
    w.wain_color_line = null;
    w.wain_ad_type = null;
}
 
function wain_error_handler(message, url, line) {
    wain_show_ad();
    return true;
}
 
window.onerror = wain_error_handler;
 
if (window.wain_ad_frameborder == null) {
    wain_ad_frameborder = 0;
}
 
if (window.wain_ad_output == null) {
    wain_ad_output = 'html';
}
 
if (window.wain_ad_format == null && window.wain_ad_output == 'html') {
    wain_ad_format = wain_ad_width + 'x' + wain_ad_height;
}
 
if (window.wain_page_url == null) {
    wain_page_url = document.referrer;
    if (window.top.location == document.location) {
        wain_page_url = document.location;
        wain_last_modified_time = Date.parse(document.lastModified) / 1000;
    }
}

wain_show_ad();


//usage:
//<script type="text/javascript"><!--
//wain_ad_client = "pub-95331612639xxxxx";
//wain_ad_select = "xxxx";   //优选广告id
//wain_ad_width = 300;
//wain_ad_height = 250;
//wain_ad_format = "300x250_as";
//wain_ad_type = "text_image";
//wain_ad_channel = "";
//wain_color_border = "FFFFFF";
//wain_color_bg = "FFFFFF";
//wain_color_link = "000063";
//wain_color_text = "000000";
//wain_color_url = "008000";
////--></script>
//<script type="text/javascript"
//src="http://pagead2.googlesyndication.com/pagead/show_ads.js">
//</script>
