var commands = {
    'definedCommands': ['quit', 'displaytt', 'prematuresend', 'revokesingle'],
    'implementation': [
        function(argumentArray){
            //quit implementation
            //arguments not called
            var areYouSure = confirm('Are you sure you want to quit?');
            if(areYouSure === true){
                alert('Alert: Here are your current NZSC Truthtables... \n ' + JSON.stringify(truthtables));
                stop = true;
            }
            else{
                alert('Alert: Quit procedure terminated!');
            }
        },
        function(argumentArray){
            //displaytt implementation
            //arguments not called
            alert(JSON.stringify(truthtables));
        },
        function(argumentArray){
            //prematuresend implementation
            //arguments[0, 1] are called
            //syntax: /prematuresend/<location id>/<stringify>
            var output = truthtables;
            if(argumentArray[1] === true || argumentArray[1] == 'true'){
                output = JSON.stringify(truthtables);
            }
            if(document.getElementById(argumentArray[0]) !== null){
                document.getElementById(argumentArray[0]).innerHTML = output;
            }
            else{
                alert('Error: Element not found!');
            }
        },
        function(argumentArray){
            alert('Alert: Command disabled!');
            //revokesingle implementation
            //arguments not called
            /*var currentPackages = [];
            for(var packageChecked in truthtables.tables){
                currentPackages.push(truthtables.tables[packageChecked].name);
            }
            var selectMessage = 'Please type the numeric index of the package you wish to modify: ';
            for(var itemTranslated in currentPackages){
                selectMessage = selectMessage + '\n\t' + itemTranslated + ': ' + currentPackages[itemTranslated];
            }
            var packageIndex = prompt(selectMessage);
            if(typeof truthtables.tables[packageIndex] === 'object'){
                var comparisonsRecorded = [];
                for(var resultArrayChecked in truthtables.tables[packageIndex]){
                    var appropriateMoveArray = (truthtables.tables[packageIndex])[resultArrayChecked];
                    for(var appropriateMoveChecked in appropriateMoveArray){
                        comparisonsRecorded.push(appropriateMoveArray[appropriateMoveChecked]);
                    }
                }
                selectMessage = 'Please type the numeric index of the comparison you would like to correct: ';
                for(var recordedComparisonChecked in comparisonsRecorded){
                    selectMessage = selectMessage + '\n\t' + recordedComparisonChecked + ': ' + comparisonsRecorded[recordedComparisonChecked];
                }
                var comparisonChecked = prompt(selectMessage);
                if(typeof comparisonsRecorded[comparisonChecked] === 'string'){
                    var comparisonCorrected = comparisonsRecorded[comparisonChecked];
                    //This should be a string describing the opposing move.
                    for(var comparisonSearchedFor in truthtables.tables[packageIndex]){
                        if(((truthtables.tables[packageIndex])[comparisonSearchedFor]).indexOf(comparisonCorrected) > -1){
                            var deletionIndex = ((truthtables.tables[packageIndex])[comparisonSearchedFor]).indexOf(comparisonCorrected);
                            (truthtables.tables[packageIndex])[comparisonSearchedFor].splice(deletionIndex, 1);
                        }
                    }
                    //IMPORTANT: persistantlyAsk has not been redefined to a functioning function yet, thus, this module cannot be called yet without nasty sideeffects
                    persistentlyAsk(truthtables.tables[packageIndex].name, truthtables.tables[packageIndex], comparisonCorrected, true);
                    alert('Alert: Comparison rewritten!');
                }
                else{
                    alert('Error: Invalid index!');
                }
            }
            else{
                alert('Error: Invalid index!');
            }*/
        }
    ],
    'sendErrorMessage':function(){
        alert('Error: Invalid Command Call!');
    },
    'execute': function(keyword){
        //keyword must be pre-sanitized or else program may crash
        keyword = keyword.split('/');
        var statement = keyword[1];
        keyword.splice(0, 2);
        //keyword.slice() removes the first two items of the array which are '' and the statement
        //keyword is now an array of arguments that will be passed into an implemented function as an array
        if(this.definedCommands.indexOf(statement) > -1){
            if(keyword.length > 0){
                this.implementation[this.definedCommands.indexOf(statement)](keyword);
            }
            else{
                this.implementation[this.definedCommands.indexOf(statement)]();
            }
        }
        else{
            this.sendErrorMessage();
        }
    }
};
