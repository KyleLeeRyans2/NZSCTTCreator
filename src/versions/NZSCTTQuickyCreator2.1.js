//By Kyle Lin, Copyright (C) July, 2015, all rights reserved. Apologies for messiness of code, this is a mere roughdraft.
var moves = ['Kick', 'Ninja Sword', 'Nunchucks', 'Shadow Fireball', 'Shadow Slip', 'Run in Circles', 'Lightning Fast Karate Chop', 'Rampage', 'Strength/Muscle', 'Zap', 'Regenerate', 'Gravedigger', 'Zombie Corps', 'Apocalypse', 'Samurai Sword', 'Helmet', 'Smash', 'Lightning', 'Earthquake', 'Twist', 'Bend', 'Juggling Knives', 'Acid Spray', 'Nose', 'Backwards Mustachio', 'Nose of the Taunted', 'Mustache Mash', 'Big Hairy Deal'];
var comparisonsLogged = 0;
var totalComparisonsRequired = moves.length * moves.length;
var truthtables = {
    'reference': (function(){var newMoves = [];for(var moveChecked in moves){newMoves.push(moves[moveChecked]);}return newMoves;})(),
    'tables': []
};
var stop = false;
var doNothing = function(){
    
};
var MoveInfoPackage = function(name, wins, ties, losses, specialTies, exceptions){
    this.name = name;
    this.wins = wins;
    this.ties = ties;
    this.losses = losses;
    this.specialTies = specialTies;
    this.exceptions = exceptions;
};
var numberToResult = function(number){
    return ['ties', 'wins', 'loses', 'specially ties', 'is treated specially'][number];
};
var persistentlyAsk = function(){
    //This temporary empty definition is to allow commands to reference this function, it will properly be redefined later.
};
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
persistentlyAsk = function(moveArgument, target, moveComparedTo, smart){
    //moveArgument is a string, target is the target object, moveComparedTo is a numerical index, smart is an option to make deductions based on previous comparisons.
    if(stop === false){
        var check = function(){
            for(var existingComparisonsChecked in truthtables.tables){
                if([moveArgument, moves[moveComparedTo]].indexOf(truthtables.tables[existingComparisonsChecked].name) > -1){
                    return existingComparisonsChecked;
                }
            }
            return -1;
        };
        var counterpartIndex = check();
        if(smart && (counterpartIndex > -1)){
            if(truthtables.tables[counterpartIndex].name === moves[moveComparedTo]){
                var deducedResult;
                for(var existingOperandsChecked in truthtables.tables[counterpartIndex]){
                    if((truthtables.tables[counterpartIndex])[existingOperandsChecked].indexOf(moveArgument) > -1){
                        deducedResult = existingOperandsChecked;
                    }
                }
                deducedResult = ['wins', 'losses', 'ties', 'specialTies', 'exceptions'][['losses', 'wins', 'ties', 'specialTies', 'exceptions'].indexOf(deducedResult)];
                target[deducedResult].push(moves[moveComparedTo]);
                comparisonsLogged = comparisonsLogged + 1;
            }
        }
        else{
            var comparison = prompt(moveArgument + ' versus ' + moves[moveComparedTo] + ' results in ____?');
            var isCommand = false;
            if(typeof comparison === 'string'){
                if(comparison.slice(0, 1) === '/'){
                    isCommand = true;
                }
            }
            if(isCommand === true){
                if(confirm('Are you sure you want to execute Command: ' + comparison + ' ?')){
                    commands.execute(comparison);
                    persistentlyAsk(moveArgument, target, moveComparedTo, smart);
                }
                else{
                    persistentlyAsk(moveArgument, target, moveComparedTo, smart);
                }
            }
            else{
                var confirmation = confirm('Are you sure that ' + moveArgument + ' ' + numberToResult(comparison) + ' against ' + moves[moveComparedTo] + '?');
                if(confirmation){
                    if(typeof target[['ties', 'wins', 'losses', 'specialTies', 'exceptions'][comparison]] === 'object'){
                        target[['ties', 'wins', 'losses', 'specialTies', 'exceptions'][comparison]].push(moves[moveComparedTo]);
                        comparisonsLogged = comparisonsLogged + 1;
                    }
                    else{
                        alert('Error: Input invalid!');
                        persistentlyAsk(moveArgument, target, moveComparedTo, smart);
                    }
                }
                else{
                    persistentlyAsk(moveArgument, target, moveComparedTo, smart);
                }
            }
        }
        
    }
};
var requireInfo = function(moveArgument, smart){
    if(stop === false){
        var moveInfo = new MoveInfoPackage(moveArgument, [], [], [], [], []);
        for(var moveComparedTo in moves){
            persistentlyAsk(moveArgument, moveInfo, moveComparedTo, smart);
        }
        return moveInfo;
    }
};
var create = function(smart){
    if(stop === false){
        for(var moveResearched in moves){
            if(stop === false){
                alert('Next: ' + (moves.length - moveResearched) + ' moves to complete');
                truthtables.tables.push(requireInfo(moves[moveResearched], smart));
                if(stop === false){
                    alert('Good going! ' + comparisonsLogged + ' out of ' + totalComparisonsRequired + ' complete!');
                }
            }
        }
    }
};
console.log(truthtables);
var send = function(locationId, stringify/*, quotes*/){
    var output = truthtables;
    if(stringify === true){
        output = JSON.stringify(truthtables);
        /*if(quotes === 1){
            var outputArray = output.split('');
            for(var outputArrayChecked in outputArray){
                if(outputArray[outputArrayChecked] === '\u0022'){
                    outputArray[outputArrayChecked] = '\u0027';
                }
            }
        }*/
    }
    if(locationId !== null && locationId !== undefined){
        document.getElementById(locationId).innerHTML = output;
    }
};
/*Initiation Code:
create(true);
send('tt', true);
*/
