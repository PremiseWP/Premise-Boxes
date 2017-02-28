# Premise Boxes #

### Description

This plugin is an attempt at reducing the gap there is between developers and project/content managers. The idea is to provide a UI that is user friendly for the ones who do not code, yet offer a code editor for developers who sometimes feel it is easier to make changes writing code. The concept is simple: You can insert content using the WYSIWYG eiditor but wrap that content with custom HTML. This is where the gap with developers gets shorten! Premise Boxes offers a code editor that allows developers to enter HTML code and use the variable %%CONTENT%% to insert the content from the Project/Content manager into the markup. It allows for both sides to work togehter and support each other!

This plugin only loads styles and scripts in the backend (when creating or editing a post). It currently does not bind any styles or scripts to the front end.

**Important**: Premise Boxes does not do any HTML validation for you. It is important to trust the people that are using this plugin or have access to it.

## What can I do with it? ##

If you are wondering what you can do with this plugin or how it could be beneficial. Lets think of a scenario shall we? Lets say John (developer) added some cool animation for one element in a page. A few weeks later the Mike (conten manger) needs to make some changes to the copy inside the element with the animation John created. This is extremely urgent (legal copy, you know how that goes!) but John is sick. Mike has to go in there and look at the code John wrote and guess how to change the copy. Meanwhile, things break and time is wasted!

So Premise Boxes solves this problem by alliwng John to code in a separate editor than the one Mike uses. John uses his code editor and writes the follwing code to add a heart beat animation to the element in the front end:

```html
<style type="text/css">
	.my-cool-content.boom {
		animation-name: palp;
		animation-duration: .2s;
		animation-direction: linear;
		/*animation-fill-mode: forwards;*/
		animation-iteration-count: infinite;
	}
	@keyframes palp {
		0% {
			transform: scale(1,1);
		}
		50% {
			transform: scale(.5,.5);
		}
		100% {
			transform: scale(1,1);
		}
	}
</style>
<div class="my-cool-content">
	%%CONTENT%%
</div>

<script type="text/javascript">
	(function($){
		$(document).ready(function(){
			setInterval(function(){
				$('.my-cool-content').removeClass('boom');
				set
				clearInterval();
			}, 3000);
		});
	}(jQuery));
</script>
```

Mike can use the WYSIWYG editor to change the content without affecting or worrying about the code above. Whatever content Mike enters will replace `%%CONTENT%%` so John can control everything around the content.

### Uses CodeMirror

CodeMirror is a in-browser code editor. We use it on the code editor for developers. To learn more about it [click here](http://codemirror.com/).

## Changelog

**v1.0.1**
* Fixed plugin file not being found. Had upper case letters for the directory which changed when lauching the plugin. updated to lower casee, we are good now!

**v1.0.0**
* Release version 1.0.0