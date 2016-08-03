# this is the research of ESLint using in Stubhub
# please notice:
#1. this not converted to Tern project
#2. 



# reference:
# https://github.corp.ebay.com/Stubhub/eslint-config-stubhub
# 
eslint-config-stubhub
Linting config for StubHub Unified

Based on StubHub Javascript Style Guide

Setup

Install eslint globally (latest version is 2.3.0 as of this writing)
> npm install -g eslint
Install the following packages in your project directory
> npm install --save-dev eslint-config-stubhub gruntify-eslint		//already done
Note: You may have to also install eslint-config-stubhub inside your editor's node_modules in order to get live editor linting.

Create a .eslintrc.json in your root project directory with the following content
{
    "extends": ["stubhub"]
}
Add the eslint Grunt task in your Gruntfile
grunt.loadNpmTasks('gruntify-eslint');
eslint: {
      src: ['./app/scripts/**/*.js']
}
grunt.registerTask('build', 
	['clean:dev', 'eslint', 'copy:imgDev', 'sass:dev', 'cssmin:dev', 'sh_precompile:dev', 
	'dustjs:dev', 'concat:dev', 'copy:dev', 'copy:devCommon', 'requirejs:dev']);

Linting Best Practices

When making linting changes in your code, make sure to create pure linting commits before creating a pull request. 
Your commit should not be coupled with other feature changes to avoid confusion for the reviewer.

Do not overwrite the StubHub default lint rules. 
If you need to temporarily disable a rule, use the commenting technique to disable the specific rule at the top of your file. 
E.g: /* eslint no-console: 0 */ But don't commit these comments to GitHub!

If you have a suggestion for a new lint rule for us to adopt, 
feel free to create a pull request in this current repository.

In order to maintain consistent coding styles between different editors and IDEs, 
it is recommended to use the EditorConfig plugin and beautifier plugin for your editor (supported by Atom, Sublime and Webstorm). 
Feel free to copy the .editorconfig file in this repository to the root directory of your project. Go here more information about EditorConfig.
