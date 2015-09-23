Summary
================================

* [Getting Started](#getting-started)
* [How it works](#how-it-works)
  * [Data driving with json](#data-driving-with-json)
  * [Smart processing](#smart-processing)
  * [Real time updating](#real-time-updating)
* [Configure your presentation and slides](#configure-your-presentation-and-slides)
  * [Setup a presentation](#setup-a-presentation)
  * [Setup a slide](#setup-a-slide)
* [Run smartRep on your project](#run-smartrep-on-your-project)
* [How manage your templates](#how-manage-your-templates)
  * [How templates are shared and organized](#how-templates-are-shared-and-organized)
  * [Create a simple template](#create-a-simple-template)
  * [Create a dynamic template](#create-a-dynamic-template)
* [How manage your less](#how-manage-your-less)
  * [How less is shared and organized](#how-less-is-shared-and-organized)
  * [Create and add less file](#create-and-add-less-file)
* [How manage your javascript](#how-manage-your-javascript)
  * [How js is shared and organized](#how-js-is-shared-andorganized)
  * [Create and add js file](#create-and-add-javascript-file)
* [How manage your images](#how-manage-your-images)
  * [How images are shared and organized](#how-images-are-shared-and-organized)
* [How manage your medias](#how-manage-your-medias)
  * [How medias are organized](#how-medias-are-organized)
* [How manage your thumbnails](#how-manage-your-thumbnails)
  * [How thumbnails are organized](#how-thumbnails-are-organized)
* [How manage your configuration files for deployment](#how-manage-your-configuration-files)
  * [How a configuration file works](#how-a-configuration-file-works)
  * [Create and add a configuration file](#create-and-add-a-configuration-file)
* [Folder organization](#folder-organization)
* [Tools and plugins used by SmartRep](#tools-and-plugins-used-by-smartrep)
* [Create a report of a Call in Salesforce](#analytics-report)
* [Versioning control](#versioning-control)
* [Best practices](#best-practices)



<a id="gettingstarted"></a>What is SmartRep?
================================

SmartRep is automated building script that allows you to create slideshow-style presentations which can then by a product rep to share information about a product (hence the name, "SmartRep"). It uses Node server and gruntjs for easy coding and deployment on iRep. This project is designed to improve workflow by using JSON to drive information and execute specific tasks during your development and to give you an overview of the result on every device in real time.

SmartRep is based around "projects" which can contain within them multiple slideshow presentations. Slideshows (referred to as "presentations") are defined in the presentations.json file, and slides for a the project are defined in the slides.json file.



<a id="gettingstarted"></a>Getting Started -- installing SmartRep
================================

1.  Install [nodejs](http://nodejs.org/).
2.  Git clone [smartRep](https://github.com/KlickInc/klick-smartrep) on your local machine. The root folder should look something like this:

   * config.js
   * favicon.ico
   * Gruntfile.js
   * install.bat [installer for Windows]
   * install.sh [installed for Mac]
   * node_modules
   * package.json
   * projects [folder for your projects]
   * projects/example [a sample project]
   * README.md
   * smartrep
   * sr [script runner for Windows]
   * sr.sh [script runner for Mac]

3.  Install neccesary npm pages by running 'install.bat' for windows for 'install.sh' for Mac.
4.  Git clone or setup your project into the /projects folder.
5.  Edit "config.js" and set "local_ip_address" to 'localhost'/'127.0.0.1' if you plan to browse locally using http://127.0.01:3000. 
6.  If you plan to browse from a different device (eg. iPad), set `local_ip_address` to your workstation's I.P. number. For example, if my workstation's I.P. number is 123.123.123.123, you could browse to http://123.123.123.123:3000 in your iPad.
[ ps. to find your ip number, use "ipconfig" [for Windows] or "ifconfig" [for Mac] in the terminal. ]
7. At this point, you should be able to run the 'example' project. In the terminal, run "sr example 1" [for Windows] or "./sr.sh example 1" [for Mac]. You should be able to see messages appearing in the terminal followed by your browser opening up with the default page showing:

![Alt text](/smartrep/img/smartrepLanding.png?token=AFLSX6tzylrDD-2MpMchRcw__ehcryukks5UW8UCwA%3D%3D "Sample screen")


<a id="configureyourpresentationandslides"></a>Develop your own presentation
================================

To run SmartRep, you must configure your presentation and slides. Data for each of the presentations is contained in the `presentation.json` file, and data for the slides is contained in `slides.json`.

<a id="setupapresentation"></a>Setup a new presentation
-------------------------

To create a new presentation, you must edit the `presentation.json`, which can be found at `projects/your irep project/src/parameters/presentation.json`. Each presentation requires the following information:

<table>
  <tr>
    <th>parameter name</th>
    <th>description</th>
    <th>value type</th>
    <th>example</th>
  </tr>
  <tr>
    <td>id</td>
    <td>Unique presentation identifier. This parameter is used for naming files in the building process.</td>
    <td>unique integer</td>
    <td>1</td>
  </tr>
  <tr>
    <td>name</td>
    <td>Unique presentation name. This parameter is used for naming files in the deployment process.</td>
    <td>unique string</td>
    <td>types_of_fruit</td>
  </tr>
  <tr>
    <td>slide</td>
    <td>List of slides that make up the presentation.</td>
    <td>array of integer</td>
    <td>1,2,3</td>
  </tr>
  <tr>
    <td>bodyclass</td>
    <td>Used to add specific body class to all project slides</td>
    <td>string</td>
    <td>mainClass, anotherClass</td>
  </tr>
  <tr>
    <td>template</td>
    <td>List of templates applied to all slides. A template is a `.htm file` which can be processed with json data. You do not have to write the extension.</td>
    <td>array of string (optional)</td>
    <td>bodyTemplate.htm, navigation.htm</td>
  </tr>
    <td>less</td>
    <td>List of less files added to all slides. A less is a `.less file` which is compiled in css to be interpreted by the web view. You do not have to write the extension. Go [here](http://lesscss.org/) for more information about less.</td>
    <td>array of string (optional)</td>
    <td>styles.less, navStyles.less</td>
  </tr>
  <tr>
    <td>js</td>
    <td>List of javascript files added to all slides.</td>
    <td>array of string (optional)</td>
    <td>jquery.js, scripts.js</td>
  </tr>
</table>

Add the values for each of these attributes into the presentation.json file in the same way as we have done in this example:

    {
        "presentation": [
            {
                "id": [1],
                "name": ["types_of_fruit"],
                "slide": [1,2,3],
                "bodyclass": ["mainClass anotherClass"],
                "template":["bodyTemplate", "navigation"], 
                "less":["styles", navStyles],
                "js":["jquery", "scripts"]
            }
        ]
    }

Notice that you can list multiple files for template files, less files, and javascript files. You do not need to put the extensions at the end of the file name (e.g., ".less", ".htm", or ".js"). You can also put multiple body classes separated by spaces (you do not need to separate them with commas).

<a id="setupaslide"></a>Setup a slide
-------------------------
Now that you have defined your presentation in the `presentation.josn` file, you will need to define the slides in the `slides.json` file (which can be found at `projects/your irep project/src/parameters/slide.json`). We have to specify the following parameters for each individual slide in a project:

<table>
  <tr>
    <th>parameter name</th>
    <th>description</th>
    <th>value type</th>
    <th>example</th>
  </tr>
  <tr>
    <td>id</td>
    <td>Unique slide identifier. This parameter is used for naming files in the building process.</td>
    <td>unique integer</td>
    <td>1</td>
  </tr>
  <tr>
    <td>name</td>
    <td>Unique slide name. This parameter is used for naming files in the deployment process.</td>
    <td>unique string</td>
    <td>info_about_cheeries</td>
  </tr>
  <tr>
    <td>description</td>
    <td>Slide description used in irep to describe a slide in the slide selector panel.</td>
    <td>string</td>
    <td>Information about cherries</td>
  </tr>
  <tr>
    <td>bodyclass</td>
    <td>Used to add specific body class to this specific slide.</td>
    <td>string</td>
    <td>cherries</td>
  </tr>
  <tr>
    <td>keymessage</td>
    <td>List of keymessage that configure a slide for `irep`</td>
    <td>array of integers</td>
    <td>[2]</td>
  </tr>
  <tr>
    <td>template</td>
    <td>List of templates applied to this specific slide. A template is a `.htm file` which can be processed with json data. You do not have to write the extension.</td>
    <td>array of string (optional)</td>
    <td>["fruitSlide","cherrySlide"]</td>
  </tr>
    <td>less</td>
    <td>List of less files added to this specific slide. A less is a `.less file` which is compiled in css to be interpreted by the web view. You do not have to write the extension.</td>
    <td>array of string (optional)</td>
    <td>["slideStyles","fruitStyles","cherryStyles"]</td>
  </tr>
  <tr>
    <td>js</td>
    <td>List of javascript files added to this specific slide.</td>
    <td>array of string (optional)</td>
    <td>["slideScript","fruitScript","cherryScript"]</td>
  </tr>
</table>


In your slide.json file, fill out the parameters for each of the slides in your project. The example below shows how these parameters might look for a project with three slides. 

    {
        "slide": [
            {
                "id": 1,
                "name": "info_about_cheeries",
                "description": "Information about cherries",
                "bodyclass": "slideClass1 cherries",
                "keymessage": [2],
                "template": ["fruitSlide","cherrySlide"],
                "js": ["slideScript","fruitScript","cherryScript"],
                "less": ["slideStyles","fruitStyles","cherryStyles"],   
            },
            {
                "id": 2,
                "name": "info_about_grapes",
                "description": "Information about grapes",
                "bodyclass": "slideClass1 grapes",
                "keymessage": [4],
                "template": ["fruitSlide","grapeSlide"],
                "js": ["slideScript","fruitScript","grapeScript"],
                "less": ["slideStyles","fruitStyles","grapeStyles"],  
            },
            {
                "id": 3,
                "name": "info_about_bananas",
                "description": "Information about bananas",
                "bodyclass": "slideClass1 bananas",
                "keymessage": [6],
                "template": ["fruitSlide","bananaSlide"],
                "js": ["slideScript","fruitScript","bananaScript"],
                "less": ["slideStyles","fruitStyles","bananaStyles"], 
            }
        ]
    }



SmartRep is now configured enough to run the presentation with these slides.

<a id="runsmartreponyourproject"></a>Run smartRep on your project
================================

1.  Open Git bash in `smartrep folder` and type `sr your_irep_project your_presentation_id` (example : `sr myproject 1` to run presentation 1 of myproject).
2.  Then open a web-browser on your desktop, ipad or windows8 device and type in the url bar `http://your ip local network ip address:3000` (example : `http://10.10.10.125:3000` if your local network ip is `10.10.10.125`).

You are now ready for coding and deployments.


<a id="howmanageyourtemplates"></a>How to manage your templates
================================

<dl>
  <dt>Where are the template files?</dt>
  <dd>All your template files have to be put in  <code>projects/your irep project/src/template/</code> folder.</dd>
  <dt>What is a template file?</dt>
  <dd>A template file is an HTML file that is used to create the slides. These files can be thought of as "partials" -- partial html files that are combined to make a single slide. The files "top.htm" and "bottom.htm" are put in by default, and all the .htm files which are specified in the presentation.json and slides.json files are added (in the order they are listed) in between the top.htm and bottom.htm files. Because iPads and Windows 8 devices have defined resolutions, different pieces of html can be combined and superimposed on top of one-another easily using absolute positioning.</dd>
  <dt>Wihch extension?</dt>
  <dd>.htm</dd>
</dl>

See [this](http://www.google.ca) video example.

<a id="howtemplatesaresharedandorganized"></a>How templates are shared and organized
-------------------------

A template can be unique to a slide or shared by all slides. 

* If you want to add a template for a specific slide, open `projects/your irep project/src/parameters/slide.json` and update/add the `template` parameter with the template filename (without extension).
Example : If you want add `foorbar.htm` template only for the first slide.

        {
            "slide": [
                {
                    "id": 1,
                    "name": "slide_1"
                    "template": ["foorbar"] 
                }
            ]
        }



* If you want to add a template for all slides without having to define it for each of them, open `projects/your irep project/src/parameters/presentation.json` and update/add the `template` parameter with the template filename (without extension).
Example : If you want add `foorbar.htm` template for all presentation slides.

        {
            "presentation": [
                {
                    "id": 1,
                    "name": "my_project",
                    "slide": [1,2],
                    "template":["foobar"]
                }
            ]
        }

* If you want to add a template for a specific subparameter, open `projects/your irep project/src/parameters/your_sub_module.json` and update/add the `template` parameter with the template filename (without extension). Smartrep will process every template parameter related to a slide.
Example : If you want use `foorbar.htm` for menu_top_1 and `foorbar2.htm` for menu_top_2.
                                                            
        {
            "menu_top": [
                {
                    "id": 1,
                    "name": "menu_top_1",
                    "template":["foobar"]
                },
                {
                    "id": 2,
                    "name": "menu_top_2",
                    "template":["foobar2"]
                }
            ]
        }



<a id="createasimpletemplate"></a>Create a simple template
-------------------------
A simple template is a static html file which does not require data processing. 
Example : You want to add a header for every slide which displays the same title.

1.  Create an htm file named `main_header.htm` and save it in `projects/your irep project/src/template/` folder

        <header class="main_header">
            <h1>Foo bar</h1>
        </header>

2.  Open `projects/your irep project/src/parameters/presentation.json` and update `template` parameter with the value `main_header` (without extension)

        {
            "presentation": [
                {
                    "id": 1,
                    "name": "my_project",
                    "slide": [1,2],
                    "template":["main_header"]
                }
            ]
        }


<a id="createadynamictemplate"></a>Create a dynamic template
-------------------------
A dymanic template is a html file which require data processing. Data are grabbed from json files linked to a slide. 
Example : You want to add a header to every slide which display the current slide title.

1.  Create a htm file named `main_header.htm` and save it in `projects/your irep project/src/template/` folder

        <%if(type of(s.description) != undefined ){%>
          <header class="main_header">
              <h1><%=s.description%></h1>
          </header>
        <%}%>

2.  Open `projects/your irep project/src/parameters/presentation.json` and update `template` parameter with the value `main_header` (without extension)

        {
            "presentation": [
                {
                    "id": 1,
                    "name": "my_project",
                    "slide": [1,2],
                    "template":["main_header"]
                }
            ]
        }

<a id="howmanageyourless"></a>How manage your less
================================

<dl>
  <dt>Where are the LESS files?</dt>
  <dd>All your less files have to be put in `projects/your irep project/src/less/` folder.</dd>
  <dt>What is a LESS file?</dt>
  <dd>LESS is a dynamic stylesheet language and is very useful to organize you well your styles. SmartRep will compile your LESS to CSS for you.</dd>
  <dt>Which extension?</dt>
  <dd>.less</dd>
</dl>

<a id="howlessissharedandorganized"></a>How LESS is shared and organized
-------------------------

A LESS can be unique to a slide or shared by all slides.

* If you want to add a LESS file for a specific slide, open `projects/your irep project/src/parameters/slide.json` and update/add the `less` parameter with the LESS filename (without extension).
Example : If you want add `foorbar.less` only for the first slide.

        {
            "slide": [
                {
                    "id": 1,
                    "name": "slide_1",
                    "less": ["foorbar"] 
                }
            ]
        }


* If you want to add a LESS for all slides without having to define it for each of them, open `projects/your irep project/src/parameters/presentation.json` and update/add the `LESS` parameter with the LESS filename (without extension).
Example : If you want add `foorbar.less` for all presentation slide.

        {
            "presentation": [
                {
                    "id": 1,
                    "name": "my_project",
                    "slide": [1,2],
                    "less":["foorbar"]
                }
            ]
        }


<a id="createandaddlessfile"></a>Create and add a LESS file
-------------------------

Example : You want to style the header for every slide which displays the current slide title.

1.  Create a less file named `main_less.less` and save it in `projects/your irep project/src/less/` folder

        header{
          background-color:red;
          width:500px;
          color:black;
          h1{
            color:green;
          }
        }

2.  Open `projects/your irep project/src/parameters/presentation.json` and update `less` parameter with the value `main_header` (without extension)

        {
            "presentation": [
                {
                    "id": 1,
                    "name": "my_project",
                    "slide": [1,2],
                    "template":["main_header"],
                    "less":["main_header"]
                }
            ]
        }


<a id="howmanageyourjavascript"></a>How manage your javascript
================================

<dl>
  <dt>Where are the javascript files?</dt>
  <dd>All your javascript files have to be put in `projects/your irep project/src/js/` folder.</dd>
  <dt>Which extension?</dt>
  <dd>.js</dd>
</dl>

<a id="howjavascriptissharedandorganized"></a>How javascript is shared and organized
-------------------------

A javascript file can be unique to a slide or shared by all slides.

* If you want to add a javascript function for a specific slide, open `projects/your irep project/src/parameters/slide.json` and update/add the `js` parameter with the javascript filename (without extension).
Example : If you want add `foorbar.js` only for the first slide.

        {
            "slide": [
                {
                    "id": 1,
                    "name": "slide_1",
                    "js": ["foorbar"] 
                }
            ]
        }



* If you want to add a javascript function for all slides without having to define it for each of them, open `projects/your irep project/src/parameters/presentation.json` and update/add the `js` parameter with the javascript filename (without extension).
Example : If you want add `foorbar.js` for all presentation slide.

        {
            "presentation": [
                {
                    "id": 1,
                    "name": "my_project",
                    "slide": [1,2],
                    "js":["foorbar"]
                }
            ]
        }


<a id="createandaddjavascriptfile"></a>Create and add javascript file
-------------------------

Example : You want to open/close the popup witch the class 'foo' after touching the button with the class 'bar' for the first slide.

1.  Create a javascript file named `popup.js` and save it in `projects/your irep project/src/js/` folder

        $(document).ready(function(){
            $('.bar').on('touchstart', function(e){
                if($('.foo').hasClass('active')){
                    $('.foo').removeClass('active');
                    $('.foo').hide(300);
                }else{
                    $('.foo').addClass('active');
                    $('.foo').show(300);
                }
            });
        });

2.  Open `projects/your irep project/src/parameters/presentation.json` and update `js` parameter with the value `popup` (without extension)

        {
            "slide": [
                {
                    "id": 1,
                    "name": "slide_1",
                    "js":["popup"]
                }
            ]
        }

 
<a id="howmanageyourimages"></a>How manage your images
================================

<dl>
  <dt>Where are the image files?</dt>
  <dd>
    <ul>
      <li>Images files have to be put in `projects/your irep project/src/img/presentation_n/slide_m` folder if they are only used by slide m of presentation n.</li>
      <li>Images files have to be put in `projects/your irep project/src/img/presentation_n/shared` folder if they are used by all slides of presentation n.</li>
    </ul>
  </dd>
  <dt>Wihch extension?</dt>
  <dd>.png .jpg .gif</dd>
</dl>

<a id="howimagesaresharedandorganized"></a>How images are shared and organized
-------------------------

An image can be unique to a slide or shared by all slides.

* If you want to add/replace/delete an image for a specific slide, open `projects/your irep project/src/img/presentation_n/slide_m/` and add/replace/delete this image.

Example : If you want add `background_1.jpg` only for the first slide of presentation 1, open `projects/your irep project/src/img/presentation_1/slide_1/` and drop the image. 

* If you want to add/replace/delete an image for all slides without having to do it in each corresponding folder, open `projects/your irep project/src/img/presentation_n/shared` and add/replace/delete the image.
Example : If you want add `header.png` for all the slides of presentation 1, open `projects/your irep project/src/img/presentation_1/shared/` and drop the image. 


<a id="howmanageyourmedias"></a>How manage your medias
================================

<dl>
  <dt>Where are the media files?</dt>
  <dd>Media files have to be put in `projects/your irep project/src/medias/presentation_n/slide_m` folder if they are used by slide m of presentation n.</dd>
  <dt>Which extensions?</dt>
  <dd>.mp4 .mov .mp3</dd>
</dl>

<a id="howmediasaresharedandorganized"></a>How medias are organized
-------------------------

If a media file is unique to a slide.

* If you want to add/replace/delete a media for a specific slide, open `projects/your irep project/src/medias/presentation_n/slide_m/` and add/replace/delete this media.

Example : If you want add `intro.mp4` for the first slide of presentation 1, open `projects/your irep project/src/medias/presentation_1/slide_1/` and drop the video.  


<a id="howmanageyourthumbnails"></a>How manage your thumbnails
================================

<dl>
  <dt>Where are the thumbnail images?</dt>
  <dd>Thumbnails have to be put in `projects/your irep project/src/img/presentation_n/slide_m` folder if they are done for slide m of presentation n.</dd>
  <dt>What are thumbnails?</dt>
  <dd>Each slide requires a screenshot of the slide in three different sizes (a total of three images): "thumb.jpg" (200px by 150px), "normal.jpg" (1024px by 768px), and "full.jpg" (2048px by 1536px).</dd>
  <dt>Wihch extensions?</dt>
  <dd>.png .jpg</dd>
</dl>

<a id="howthumbnailsareandorganized"></a>How thumbnails are organized
-------------------------

You have to have 3 different thumbnails for each slides of you presentation. Those images are similar except that each of them has a different height and width. You have to respect a naming convention and a specific size for each of them.
<dl>
  <dt>normal.{jpg,png}</dt>
  <dd>1024*768</dd>
  <dt>full.{jpg,png}</dt>
  <dd>2048*1536</dd>
  <dt>thumb.{jpg,png}</dt>
  <dd>200*150</dd>
</dl>

* If you want to add/replace/delete thumbnails for slide m of presentation n, open `projects/your irep project/src/thumbs/presentation_n/slide_m/` and add/replace/delete this thumbnails.

Example : If you want add `normal.jpg`, `full.jpg` and `thumb.jpg` for the first slide of presentation 1, open `projects/your irep project/src/img/presentation_1/slide_1/` and drop the images. 


<a id="howmanageyourconfigurationfiles"></a>How manage your configuration files for deployment
================================

<a id="howaconfigurationfileworks"></a>How a configuration file works
-------------------------

You will need to create a configuration file which will contain all the information to be able to deploy/upload automatically your updated slides without using the salesforces interface but via a FTP server. SmartRep will automatically generate and upload those configuration files by extracting related information from a JSON file.


<a id="createandaddconfigurationfile"></a>Create and add a configuration file
-------------------------

To create and associate a new configuration file open `projects/your irep project/src/parameters/keymessage.json` and add a new entry for each slide. Each of them should contain at leat this information:

<table>
  <tr>
    <th>parameter name</th>
    <th>description</th>
    <th>value type</th>
    <th>example</th>
  </tr>
  <tr>
    <td>id</td>
    <td>Unique configuration file identifier. This id will have to be used in slide.json to link the the configuration file to its related slide.</td>
    <td>unique integer</td>
    <td>1</td>
  </tr>
  <tr>
    <td>product</td>
    <td>Name of the corresponding product linked to the slide (It has to match the product name on salesforces).</td>
    <td>string</td>
    <td>Cholecap</td>
  </tr>
  <tr>
    <td>display_order</td>
    <td>Order you want slides to be displayed.</td>
    <td>integer</td>
    <td>1</td>
  </tr>
  <tr>
    <td>disable_actions_vod</td>
    <td>List of gesture event you want disable for this specific slide. This is mainly used to disable native veeva swipe functionnality to use custom pathways.</td>
    <td>string</td>
    <td>Swipe_vod</td>
  </tr>
</table>


<a id="folderorganization"></a>Folder organization
================================

<table>
  <tr>
    <th>Path</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>/smartrep</td>
    <td>
      This folder contains files related to smartRep user interface (displayed by going on `http://your ip local network ip address:3000`) and files related to grunt tasks. If you  modify a file here, it is because you have to :
      <ul>
        <li>Update user interface design</li>
        <li>Update user interface functionnalities</li>
        <li>Update or add a file used by Grunt to process a specific task</li>
      </ul>
      This folder is NOT used for styling, adding javascript or anything else related to your iRep application.
    </td>
  </tr>
  <tr>
    <td>/projects</td>
    <td>
      This folder contains all presentation source files. All the folder it contains are the different presentation repositories. The only thing you will have to do in this folder is cloning or initialize your presentation repository.<br><br> 
      You have to use those folders NAME as first parameter to run smartRep (example `sr foo 1` to run presentation 1 from repo/folder `foo`).
    </td>
  </tr>
  <tr>
    <td>/projects/foo</td>
    <td>
      This folder contains :
      <ul>
        <li>source file folder for project/git repository foo.</li>
        <li>build folder which contains processed files and is overwritten each time your are updating a source file. This folder is used by smartrep to stream the presentation on different devices. If you update something directly in this file, it will be automatically removed.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>/projects/foo/build</td>
    <td>
      This folder contains processed files and is overwritten each time your are updating a source file. This folder is used by smartrep to stream the presentation on different devices. If you update something directly in this file, it will be automatically removed.
    </td>
  </tr>
  <tr>
    <td>/projects/foo/src</td>
    <td>
      This folder contains all the source files for presentations of project/git repository  'foo'. Each subfolder correspond to a particular type of file :
      <ul>
        <li>img folder which contains a subfolder for images used by presentations of project/git repository 'foo'.</li>
        <li>js folder which contains javascript files used by presentation of project/git repository 'foo'.</li>
        <li>less folder which contains less files used by presentation of project/git repository 'foo'.</li>
        <li>media folder which contains a subfolder for medias used by presentations  of project/git repository 'foo'.</li>
        <li>parameters  which contains presentations.json to configure the presentation, slide.json to configure slides and other json files used by presentation of project/git repository 'foo'.</li>
        <li>template folder which contains html files used by presentation of project/git repository 'foo'.</li>
        <li>thumbs folder which contains a subfolder for thumbnails used by presentations  of project/git repository 'foo'.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>/projects/foo/src/img</td>
    <td>
      This folder contains a subfolder for images used by presentations of project/git repository 'foo'.
    </td>
  </tr>
  <tr>
    <td>/projects/foo/src/img/presentation_1</td>
    <td>
      This folder contains :
      <ul>
        <li>a subfolder for each specific slide images of project/git repository 'foo' presentation 1.</li>
        <li>a subfolder named shared which contains images shared by all slides of project/git repository 'foo' presentation 1</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>/projects/foo/src/img/presentation_1/slide_1</td>
    <td>
      This folder contains images used by slide 1 of project/git repository 'foo' presentation 1.
    </td>
  </tr>
  <tr>
    <td>/projects/foo/src/img/presentation_1/shared</td>
    <td>
      This folder contains images used by all slides of project/git repository 'foo' presentation 1.
    </td>
  </tr>
  <tr>
  <tr>
    <td>/projects/foo/src/js</td>
    <td>
      This folder contains javascript files used by presentation of project/git repository 'foo'.
    </td>
  </tr>
  <tr>
  <tr>
    <td>/projects/foo/src/less</td>
    <td>
      This folder contains less files used by presentation of project/git repository 'foo'.
    </td>
  </tr>
  <tr>
    <td>/projects/foo/src/medias</td>
    <td>
      This folder contains a subfolder for medias used by presentations of project/git repository 'foo'.
    </td>
  </tr>
  <tr>
    <td>/projects/foo/src/medias/presentation_1</td>
    <td>
      This folder contains :
      <ul>
        <li>a subfolder for each specific slide medias of project/git repository 'foo' presentation 1.</li>
        <li>a subfolder named shared which contains medias shared by all slides of project/git repository 'foo' presentation 1</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>/projects/foo/src/medias/presentation_1/slide_1</td>
    <td>
      This folder contains medias used by slide 1 of project/git repository 'foo' presentation 1.
    </td>
  </tr>
  <tr>
    <td>/projects/foo/src/medias/presentation_1/shared</td>
    <td>
      This folder contains medias used by all slides of project/git repository 'foo' presentation 1.
    </td>
  </tr>
  <tr>
  <tr>
    <td>/projects/foo/src/parameters</td>
    <td>
      This folder contains presentations.json to configure the presentation, slide.json to configure slides and other json files used by presentation of project/git repository 'foo'.
    </td>
  </tr>
  <tr>
    <td>/projects/foo/src/template</td>
    <td>
      This folder contains htm files used by presentation of project/git repository 'foo'.
    </td>
  </tr>
  <tr>
    <td>/projects/foo/src/thumbs</td>
    <td>
      This folder contains a subfolder for thumbnails used by presentations of project/git repository 'foo'.
    </td>
  </tr>
  <tr>
    <td>/projects/foo/src/thumbs/presentation_1</td>
    <td>
      This folder contains a subfolder for each specific slide thumbnails of project/git repository 'foo' presentation 1.
    </td>
  </tr>
  <tr>
    <td>/projects/foo/src/thumbs/presentation_1/slide_1</td>
    <td>
      This folder contains thumbnails required for irep. You need to have 3 different images :
      <ul>
        <li>normal.jpg (1024*768)</li>
        <li>full.jpg (2048*1536)</li>
        <li>thumb.jpg (200*100)</li>
      </ul>
    </td>
  </tr>  
  <tr>
    <td>/temp</td>
    <td></td>
  </tr>
</table>

* [Tools and plugins used by SmartRep](#tools-and-plugins-used-by-smartrep)

<a id="tools-and-plugins-used-by-smartrep"></a>Tools and plugins used by SmartRep
================================

<ul>
  <li>grunt (> 0.4.1)</li>
  <li>
    <ul>
      <li>grunt-open (> 0.2.3)</li>
      <li>grunt-contrib-watch (> 0.4.3)</li>
      <li>grunt-contrib-less (> 0.5.1)</li>
      <li>grunt-contrib-copy (> 0.4.1)</li>
      <li>grunt-contrib-clean (> 0.4.1)</li>
      <li>grunt-contrib-uglify (> 0.2.4)</li>
      <li>grunt-contrib-cssmin (> 0.4.1)</li>
      <li>grunt-contrib-htmlmin (> 0.1.3)</li>
      <li>grunt-contrib-imagemin (> 0.3.0)</li>
      <li>grunt-contrib-compress (> 0.4.1)</li>
      <li>grunt-contrib-concat (> 0.3.0)</li>
      <li>grunt-ftp-deploy (> 0.0.10)</li>
      <li>grunt-template (> 0.2.3)</li>
    </ul>
  </li>
  <li>express (> 3.4.0)</li>
  <li>socket.io (> 0.9.16)</li>
  <li>pngquant-bin (> 0.1.5)</li>
  <li>jpegtran (> 0.0.6)</li>
</ul>

<a id="analyticsreport"></a>Create a report data of a particular Call in Salesforce
================================

<ol>
  <li>Click the “Accounts” tab in the menu bar</li>
  <li>Select the desired Rep’s name from the “Recent Accounts” table (e.g., “Armstrong, Cindy”)</li>
  <li>Scroll down to the “Calls (Account)”</li>
  <li>Select and copy the Call Name of the desired call (e.g., C000004524).</li>
  <li>Click the “Reports” tab in the menu bar</li>
  <li>From the table, select the “My Call Clickstream Report” link</li>
  <li>Above the table there is a row of buttons, starting with “Run Report” and ending with “Export Details”. Click the button that says “Customize”.</li>
  <li>You’ll see a label that says “Filter” with a button that says “Add” next to it. Click the “Add” button.</li>
  <li>From the new dropdown menu (which says “Call ID” by default), select the option that says Call Name. Paste the Call Name in the blank field to the right of the box that says “equals”. Hit “OK”. You will now have a table with the Callstream data for that particular call.</li>
  <li>Hit the “Run Report” button. This will generate your report.</li>
  <li>If you wish to export your report as an Excel file, hit “Export Details.”</li>
</ol>




<a id="versioning-control"></a>Versioning control
================================

A technical architect will be responsible to do the versioning control with all different applications. The technical architect will have to create a new branch for every new updates and merge it into the master branch when the application goes into production.


<a id="bestpractices"></a>Best practices
================================

