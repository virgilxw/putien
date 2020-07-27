# The Putian Project
*Readme written by Reuben X. Wang (Reubenwxw@gmail.com)*

*This is a project of the Chinese Studies Department of the National University of Singapore.*

## File structures
- **/code**: This file contains the python scripts and notebooks used during the project, along with the input and output used by the code. Sub-directories, which should be self-explanatory, are:
	- /code/input/
		- /code/input/raw.pdf: This is the raw pdf of Prof Dean's second book. It was downloaded from an online repository.
		- /code/input/Surname_Groups.json: This is a work-in-process mannual coding of dominant surname groups within each village. I considered automating this as well, but the syntax is to varied for simple text processing methods. Might be easier to code by labour power, actually.
	- /code/output: CSV files in this folder were generated primarily to be fed into PostGIS; JSON was generated to feed into the web app. Most naming schemes are self-expanatory.
		- /code/
	- /code/Data Parser.ipynb: This jupyter notebook file houses all of the code used during the porject. **Do not run any of the scripts as doing so will override most of the output data which has been sanitised manually.**
	- /Processed_Layers/: This is a repository for all shapefiles that has been generated or validated. Of particular note are
		- /Processed_Layers/Jiuliyang Irrigation System
		- /Processed_Layers/Mulan Nanyang Irrigation System
		- /Processed_Layers/Alliance_Bounds_Studied: a polygon layer with only the features studied in the book.
		- /Processed_Layers/Village_Point_studied_1: a polygon layer with only the features studied in the book.
	- /retrieved_layers: a local cache of files retrieved from the SHGIS server.