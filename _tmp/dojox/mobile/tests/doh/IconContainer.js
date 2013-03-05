dojo.addOnLoad(function(){
	doh.register("dojox.mobile.test.doh.IconContainer", [
		{
			name: "IconContainer Verification",
			timeout: 4000,
			runTest: function(){
				var d = new doh.Deferred();
				setTimeout(d.getTestCallback(function(){
					var demoWidget = dijit.byId("dojox_mobile_IconContainer_0");
					doh.assertEqual('mblIconContainer', demoWidget.domNode.className);
					
				}));
				return d;
			}
		},
		{
			name: "IconItem Verification",
			timeout: 4000,
			runTest: function(){
				var d = new doh.Deferred();
				var demoWidget = dijit.byId("dojox_mobile_IconItem_0");
				var e;
				//lazy loading

				doh.assertEqual('none', demoWidget.paneWidget.domNode.style.display);
//				fireOnClick(demoWidget.domNode.childNodes[0].childNodes[0].childNodes[0]);
				fireOnMouseDown(demoWidget.domNode);
				fireOnMouseUp(demoWidget.domNode);

				demoWidget = dijit.byId("dojox_mobile_IconItem_1");
				doh.assertEqual('none', demoWidget.paneWidget.domNode.style.display);
//				fireOnClick(demoWidget.domNode.childNodes[0].childNodes[0].childNodes[0]);
				fireOnMouseDown(demoWidget.domNode);
				fireOnMouseUp(demoWidget.domNode);

				setTimeout(d.getTestCallback(function(){
					verifyIconItem("dojox_mobile_IconItem_0", 'app1', '', /icon3.png/i);
					verifyIconItem("dojox_mobile_IconItem_1", 'app2', '', /icon3.png/i);
				}),2000);
				return d;
			}
		},
		{
			name: "IconContainer set",
			timeout: 4000,
			runTest: function(){
				var demoWidget = dijit.byId("dojox_mobile_IconContainer_0");
				demoWidget.set({transition:"slide", pressedIconOpacity:"0.8"});

				doh.assertEqual(0.8, demoWidget.get("pressedIconOpacity"));
				doh.assertEqual("slide", demoWidget.get("transition"));
			}
		},
		{
			name: "IconItem set",
			timeout: 1000,
			runTest: function(){
				var demoWidget = dijit.byId("dojox_mobile_IconItem_1");
				demoWidget.set({icon:"../images/icon1.png"});
				doh.assertEqual("../images/icon1.png", demoWidget.get("icon"));
				doh.assertTrue(demoWidget.domNode.childNodes[0].childNodes[0].childNodes[0].src.search(/icon1.png/i) != -1);
			}
		},
		{
			name: "IconItem add/removeChild and pane widgets consistency",
			timeout: 1000,
			runTest: function(){
				// Checks that pane widgets are added/removed to the pane container by addChild/removeChild
				
				var container = dijit.byId("dojox_mobile_IconContainer_0");
				var item = dijit.byId("dojox_mobile_IconItem_1");
				
				doh.assertEqual(container.paneContainerWidget, item.paneWidget.getParent(), "wrong pane parent at startup");
				doh.assertEqual(item.getIndexInParent(), item.paneWidget.getIndexInParent(), "wrong pane index at startup");

				var index = item.getIndexInParent();				
				container.removeChild(item);

				doh.assertEqual(null, item.paneWidget.getParent(), "wrong pane parent after remove");
				
				container.addChild(item, index);

				doh.assertEqual(container.paneContainerWidget, item.paneWidget.getParent(), "wrong pane parent after add");
				doh.assertEqual(item.getIndexInParent(), item.paneWidget.getIndexInParent(), "wrong pane index after add");
			}
		}
	]);
	doh.run();
});
