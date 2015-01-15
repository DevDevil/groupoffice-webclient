# groupoffice-webclient — A client for the GroupOffice REST API

This project is an example of how to build a client for the Intermesh PHP Example.
In this project I've used:

* [API documentation with ApiGen](http://intermesh.io/angular/docs)
* [AngularJS](http://angularjs.org/)
* [bower](http://bower.io) to mange 3rd party packages
* services, directives and filters to communicate with the GroupOffice server API.

## Getting started
1. To get started with development you will minimally need to install:
  * [NPM](https://www.npmjs.org/)
  * [bower](http://bower.io)
  * [sass](http://sass-lang.com/)

  On Ubuntu:

  Install git and npm with apt:

  `````````````````````````
  $ sudo apt-get install git npm
  `````````````````````````

  I had to work around a bug with (see https://github.com/joyent/node/issues/3911):

  ``````````````````````````````````````````
  $ sudo ln -s /usr/bin/nodejs /usr/bin/node
  ``````````````````````````````````````````

2. Clone the repository:

  ``````````````````````````````````````````````````````````````````````
  $ git clone https://github.com/Intermesh/groupoffice-webclient.git
  ``````````````````````````````````````````````````````````````````````

3. Get all the required NPM modules by running (I had to clear the tmp folder in my home directory becasue they are owned by root now):

  ``````````````````````````````
  $ sudo rm -Rf /home/mschering/tmp/
  $ cd groupoffice-webclient
  $ npm install
  ``````````````````````````````

  This will automatically run "bower install" too. This will install all bower
  components required.

Now navigate to the "app" folder with your browser.

4. Install SASS for the stylesheets

	Installing ruby
	````````````````````````````````````````````````
	$ sudo apt-get install ruby-full build-essential
	````````````````````````````````````````````````

	Installing rubygems
	```````````````````````````````````````````
	$ sudo apt-get install rubygems-integration
	```````````````````````````````````````````

	Install sass
	`````````````````````
	$ sudo gem install sass
	`````````````````````

	check if sass is working
	`````````
	$ sass -v
	`````````

## Naming conventions

Found on https://github.com/mgechev/angularjs-style-guide

1. Modules,Directives,Filters should be named with lowerCamelCase
2. Services, Controllers should be named with UpperCamelCase
3. File names should be lowercase and use hyphens (-).

