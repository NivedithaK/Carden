# Dependencies

## Docker

We utilize Docker for quickly spinning up a test environment for Postgres. Docker is highly reccomended for development during this project, since we utilize it to perform regression testing.

### Docker Installion on Linux

The most recent instrutions for installing Docker on Linux can be found on the [Docker documentation](https://docs.docker.com/engine/install/). At the time of writing this, CentOS, Ubuntu, Fedora and Debian are well supported.

### Docker Installation on OSX/Windows

For development on OSX and Windows, Docker Desktop is required. Instructions for installing Docker Desktop can be found in the [Docker documentation](https://docs.docker.com/desktop/). Docker Desktop will take up a bit of space since it downloads an image with the Linux kernel on it.

## Docker Compose

Docker Compose is used to orchestrate the containers and network for the Carden application. Instructions to install docker-compose can be found on the offical [Docker documentation](https://docs.docker.com/compose/install/).

## Node.js 14.15.3

-   ### Node installation on Windows

    Just go on [official Node.js website](https://nodejs.org/) and download the installer.
    Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

-   ### Node installation on Ubuntu

    You can install node.js and npm easily with apt install, just run the following commands.

        $ sudo apt install nodejs
        $ sudo apt install npm

-   ### Other Operating Systems
    You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

```
$ node --version
v14.15.3

$ npm --version
6.14.6
```

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

```
$ npm install npm -g
```

## Visual Studio Code

VSCode is our reccomended IDE/text editor for working on this project. The instructions for installing VSCode can be on the [offical site](https://code.visualstudio.com/download).

We would also reccomend the following (free) plugins from the VSCode Marketplace.

-   ### Prettier

    This plugin autoformats your code to make it look neat. At some point, we will be integrating this into a makefile in order to run it on every file to keep styling consistent.

    https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

-   ### VSCode IntelliCode

    This is the Microsoft plug-in for AI assisted development, this will provide useful type-hints
    and autocomplete for JS and HTML.

    https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode

## Linux/Unix Command Line Tools

`Git` is required in order to work on this application. Installation instructions for `Git` vary between platforms, but most modern Linux Distros and versions of OSX will come with `Git` preinstalled. Windows users will be required to install [Git Bash](https://git-scm.com/downloads) or work on [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10), although neither is strictly supported.

## Browser

This application is currently only support on _modern_ browsers. Any recent version of Edge, Chrome or Firefox should work without any issues.

#### Note

We are not currently testing all browsers. Currently we only provide support for Chrome and Firefox.

# Available Scripts

In the client or server directory, you can run:

### `npm start`

Runs the app in the development mode, starting **both** the server and client.\
Open [http://localhost:3000](http://localhost:3000) to view the react client in the browser. The server is hosted on port 5000.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run local`

This runs either the client or the server, depending on which directory you call this command in. \
This is useful if you want to run the client or the server solely, without the other. This **does not use Docker**, as a result, you will want to run `npm install` prior to running this command to make sure you have all the dependencies.

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)
