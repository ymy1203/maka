require.config({
　　　paths: {
　　　　　"jquery"              : "../lib/jquery/jquery-1.11.0.min",
		  "director"	    	: "../lib/director/director",
		  // "vue"	    			: "../lib/vue/vue",
　　　},
	 shim: {
  //       'jquery.mytab'          : ['jquery'],
		// 'jquery.mypop'          : ['jquery'],
		// 'jquery.myfocus'        : ['jquery'],
		// 'jquery.scrolltotop'    : ['jquery'],
		// "jqurey.mytips"         : ['jquery'],
		// "jquery.cookie"         : ['jquery'],
		"director":{
			exports:"Router"
		}
	 }
});

