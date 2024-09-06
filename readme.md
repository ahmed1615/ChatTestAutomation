Precondtions....
requiered before get the project 
A- local should has npm installed 
b- should have the nom running for the project it self for backend and frontend 
the link for backend >>>  https://github.com/ahmed1615/chatappbe.git 
the link for backend >>>  https://github.com/ahmed1615/chatappfe.git 

Note: Access-Control-Allow-Origin (CORS) extention should be there for conect the front with back if using chrome 


-------------------------------------------------------------------------
1 -use comand npm install
2 -for running all tests >>>> npx cucumber-js --format=json:./reports/cucumber_report.json --exit
3 -for running a spesifc file related to API testing  >>  npx cucumber-js features/APITest/[FILENAME].feature
4- for running a spesifc file related to API testing  >>  npx cucumber-js features/BFrontEndTest/[FILENAME].feature
5- for generate the report > npx cucumber-js --format=json:./reports/cucumber_report.json --exit
