//document.addEventListener("DOMContentLoaded", function() {
//    var country1DataRaw = document.getElementById('country1Data').value;    
//    var country1Data = JSON.parse(country1DataRaw);
//    // Get all input elements with IDs starting with "armyFrom" and ending with "For1"
//    var armyInputs1 = document.querySelectorAll('input[id^="armyFrom"][id$="For1"]');
//    var navyInputs1 = document.querySelectorAll('input[id^="navyFrom"][id$="For1"]');
//    // Get the span elements
//    var armySpan1 = document.getElementById('army1');
//    var navySpan1 = document.getElementById('navy1');
//    var totalSpan1 = document.getElementById('total1');
//    // Get the original values
//    var originalArmyValue1 = country1Data.army;
//    var originalNavyValue1 = country1Data.navy;
//    var originalTotalValue1 = country1Data.total;
//
//    // Calculate the initial total army value
//    var initialTotalArmy1 = originalArmyValue1;
//    armyInputs1.forEach(function(input) {
//        initialTotalArmy1 += parseInt(input.value) || 0;
//    });
//    
//    // Calculate the initial total navy value
//    var initialTotalNavy1 = originalNavyValue1;
//    navyInputs1.forEach(function(input) {
//        initialTotalNavy1 += parseInt(input.value) || 0;
//    });
//
//    // Update the text content of the army and navy spans with the initial total values
//    armySpan1.value = initialTotalArmy1;
//    navySpan1.value = initialTotalNavy1;
//
//    // Calculate the initial total value and update the total span
//    var initialTotalValue1 = 240 + initialTotalArmy1 + initialTotalNavy1;
//    totalSpan1.value = initialTotalValue1;
//
//    // Add event listener to each army input field
//    armyInputs1.forEach(function(input) {
//        input.addEventListener('input', function() {
//            // Calculate the total army value
//            var totalArmy1 = originalArmyValue1;
//            armyInputs1.forEach(function(input) {
//                totalArmy1 += parseInt(input.value) || 0;
//            });
//
//            // Update the text content of the army span element
//            armySpan1.value = totalArmy1;
//            
//            // Calculate the total value and update the total span
//            var totalValue1 = 240 + totalArmy1 + (parseInt(navySpan1.value) || 0);
//            totalSpan1.value = totalValue1;
//            if (totalArmy1 != originalArmyValue1) {
//                armySpan1.style.color="#b30000";
//                totalSpan1.style.color="#b30000";
//            } else {
//                armySpan1.style.color="black";
//                totalSpan1.style.color="black";
//            }
//        });
//    });
//    
//    // Add event listener to each navy input field
//    navyInputs1.forEach(function(input) {
//        input.addEventListener('input', function() {
//            // Calculate the total navy value
//            var totalNavy1 = originalNavyValue1;
//            navyInputs1.forEach(function(input) {
//                totalNavy1 += parseInt(input.value) || 0;
//            });
//
//            // Update the text content of the navy span element
//            navySpan1.value = totalNavy1;
//            
//            // Calculate the total value and update the total span
//            var totalValue1 = 240+ (parseInt(armySpan1.value) || 0) + totalNavy1;
//            totalSpan1.value = totalValue1;
//            if (totalNavy1 != originalNavyValue1) {
//                navySpan1.style.color="#b30000";
//                totalSpan1.style.color="#b30000";
//            } else {
//                navySpan1.style.color="black";
//                totalSpan1.style.color="black";
//            }
//        });
//    });
//    
//    if (armySpan1.value != originalArmyValue1.toString()) {
//        console.log('hi');
//        armySpan1.style.color = "#b30000";
//        totalSpan1.style.color = "#b30000";
//    } else if (navySpan1.value != originalNavyValue1.toString()) {
//        console.log('hello');
//        navySpan1.style.color = "#b30000";
//        totalSpan1.style.color = "#b30000";
//    } else if (totalSpan1.value === originalTotalValue1.toString()) {
//    } else if (totalSpan1.value === originalTotalValue1.toString()) {
//        console.log('bye');
//        armySpan1.style.color = "black";
//        navySpan1.style.color = "black";
//        totalSpan1.style.color = "black";
//    }
//    
//});
//
//
//document.addEventListener("DOMContentLoaded", function() {
//    var country2DataRaw = document.getElementById('country2Data').value;    
//    var country2Data = JSON.parse(country2DataRaw);
//    // Get all input elements with IDs starting with "armyFrom" and ending with "For2"
//    var armyInputs2 = document.querySelectorAll('input[id^="armyFrom"][id$="For2"]');
//    var navyInputs2 = document.querySelectorAll('input[id^="navyFrom"][id$="For2"]');
//    // Get the span elements
//    var armySpan2 = document.getElementById('army2');
//    var navySpan2 = document.getElementById('navy2');
//    var totalSpan2 = document.getElementById('total2');
//    // Get the original values
//    var originalArmyValue2 = country2Data.army;
//    var originalNavyValue2 = country2Data.navy;
//    var originalTotalValue2 = country2Data.total;
//
//    // Calculate the initial total army value
//    var initialTotalArmy2 = originalArmyValue2;
//    armyInputs2.forEach(function(input) {
//        initialTotalArmy2 += parseInt(input.value) || 0;
//    });
//    
//    // Calculate the initial total navy value
//    var initialTotalNavy2 = originalNavyValue2;
//    navyInputs2.forEach(function(input) {
//        initialTotalNavy2 += parseInt(input.value) || 0;
//    });
//
//    // Update the text content of the army and navy spans with the initial total values
//    armySpan2.value = initialTotalArmy2;
//    navySpan2.value = initialTotalNavy2;
//
//    // Calculate the initial total value and update the total span
//    var initialTotalValue2 = 240 + initialTotalArmy2 + initialTotalNavy2;
//    totalSpan2.value = initialTotalValue2;
//
//    // Add event listener to each army input field
//    armyInputs2.forEach(function(input) {
//        input.addEventListener('input', function() {
//            // Calculate the total army value
//            var totalArmy2 = originalArmyValue2;
//            armyInputs2.forEach(function(input) {
//                totalArmy2 += parseInt(input.value) || 0;
//            });
//
//            // Update the text content of the army span element
//            armySpan2.value = totalArmy2;
//            
//            // Calculate the total value and update the total span
//            var totalValue2 = 240 + totalArmy2 + (parseInt(navySpan2.value) || 0);
//            totalSpan2.value = totalValue2;
//            if (totalArmy2 != originalArmyValue2) {
//                armySpan2.style.color="#b30000";
//                totalSpan2.style.color="#b30000";
//            } else {
//                armySpan2.style.color="black";
//                totalSpan2.style.color="black";
//            }
//        });
//    });
//    
//    // Add event listener to each navy input field
//    navyInputs2.forEach(function(input) {
//        input.addEventListener('input', function() {
//            // Calculate the total navy value
//            var totalNavy2 = originalNavyValue2;
//            navyInputs2.forEach(function(input) {
//                totalNavy2 += parseInt(input.value) || 0;
//            });
//
//            // Update the text content of the navy span element
//            navySpan2.value = totalNavy2;
//            
//            // Calculate the total value and update the total span
//            var totalValue2 = 240 + (parseInt(armySpan2.value) || 0) + totalNavy2;
//            totalSpan2.value = totalValue2;
//            if (totalNavy2 != originalNavyValue2) {
//                navySpan2.style.color="#b30000";
//                totalSpan2.style.color="#b30000";
//            } else {
//                navySpan2.style.color="black";
//                totalSpan2.style.color="black";
//            }
//        });
//    });
//    
//    if (armySpan2.value != originalArmyValue2.toString()) {
//        console.log('hi');
//        armySpan2.style.color = "#b30000";
//        totalSpan2.style.color = "#b30000";
//    } else if (navySpan2.value != originalNavyValue2.toString()) {
//        console.log('hello');
//        navySpan2.style.color = "#b30000";
//        totalSpan2.style.color = "#b30000";
//    } else if (totalSpan2.value === originalTotalValue2.toString()) {
//    } else if (totalSpan2.value === originalTotalValue2.toString()) {
//        console.log('bye');
//        armySpan2.style.color = "black";
//        navySpan2.style.color = "black";
//        totalSpan2.style.color = "black";
//    }
//    
//});
//
//


document.addEventListener("DOMContentLoaded", function() {
    var country1DataRaw = document.getElementById('country1Data').value;    
    var country1Data = JSON.parse(country1DataRaw);
    // Get all input elements with IDs starting with "armyFrom" and ending with "For1"
    var armyInputs1 = document.querySelectorAll('input[id^="armyFrom"][id$="For1"]');
    var navyInputs1 = document.querySelectorAll('input[id^="navyFrom"][id$="For1"]');
    // Get the span elements
    var armySpan1 = document.getElementById('army1');
    var navySpan1 = document.getElementById('navy1');
    var totalSpan1 = document.getElementById('total1');
    // Get the original values
    var originalArmyValue1 = country1Data.army;
    var originalNavyValue1 = country1Data.navy;
    var originalTotalValue1 = country1Data.total;

    // Calculate the initial total army value
    var initialTotalArmy1 = originalArmyValue1;
    armyInputs1.forEach(function(input) {
        initialTotalArmy1 += parseInt(input.value) || 0;
    });
    
    // Calculate the initial total navy value
    var initialTotalNavy1 = originalNavyValue1;
    navyInputs1.forEach(function(input) {
        initialTotalNavy1 += parseInt(input.value) || 0;
    });

    // Update the text content of the army and navy spans with the initial total values
    armySpan1.textContent = initialTotalArmy1;
    navySpan1.textContent = initialTotalNavy1;

    // Calculate the initial total value and update the total span
    var initialTotalValue1 = 240 + initialTotalArmy1 + initialTotalNavy1;
    totalSpan1.textContent = initialTotalValue1;

    // Add event listener to each army input field
    armyInputs1.forEach(function(input) {
        input.addEventListener('input', function() {
            // Calculate the total army value
            var totalArmy1 = originalArmyValue1;
            armyInputs1.forEach(function(input) {
                totalArmy1 += parseInt(input.value) || 0;
            });

            // Update the text content of the army span element
            armySpan1.textContent = totalArmy1;
            
            // Calculate the total value and update the total span
            var totalValue1 = 240 + totalArmy1 + (parseInt(navySpan1.textContent) || 0);
            totalSpan1.textContent = totalValue1;
            if (totalArmy1 != originalArmyValue1) {
                armySpan1.style.color="#b30000";
                totalSpan1.style.color="#b30000";
            } else {
                armySpan1.style.color="black";
                totalSpan1.style.color="black";
            }
        });
    });
    
    // Add event listener to each navy input field
    navyInputs1.forEach(function(input) {
        input.addEventListener('input', function() {
            // Calculate the total navy value
            var totalNavy1 = originalNavyValue1;
            navyInputs1.forEach(function(input) {
                totalNavy1 += parseInt(input.value) || 0;
            });

            // Update the text content of the navy span element
            navySpan1.textContent = totalNavy1;
            
            // Calculate the total value and update the total span
            var totalValue1 = 240+ (parseInt(armySpan1.textContent) || 0) + totalNavy1;
            totalSpan1.textContent = totalValue1;
            if (totalNavy1 != originalNavyValue1) {
                navySpan1.style.color="#b30000";
                totalSpan1.style.color="#b30000";
            } else {
                navySpan1.style.color="black";
                totalSpan1.style.color="black";
            }
        });
    });
    
    if (armySpan1.textContent != originalArmyValue1.toString()) {
        console.log('hi');
        armySpan1.style.color = "#b30000";
        totalSpan1.style.color = "#b30000";
    } else if (navySpan1.textContent != originalNavyValue1.toString()) {
        console.log('hello');
        navySpan1.style.color = "#b30000";
        totalSpan1.style.color = "#b30000";
    } else if (totalSpan1.textContent === originalTotalValue1.toString()) {
        console.log('bye');
        armySpan1.style.color = "black";
        navySpan1.style.color = "black";
        totalSpan1.style.color = "black";
    }
    
});


document.addEventListener("DOMContentLoaded", function() {
    var country2DataRaw = document.getElementById('country2Data').value;    
    var country2Data = JSON.parse(country2DataRaw);
    // Get all input elements with IDs starting with "armyFrom" and ending with "For2"
    var armyInputs2 = document.querySelectorAll('input[id^="armyFrom"][id$="For2"]');
    var navyInputs2 = document.querySelectorAll('input[id^="navyFrom"][id$="For2"]');
    // Get the span elements
    var armySpan2 = document.getElementById('army2');
    var navySpan2 = document.getElementById('navy2');
    var totalSpan2 = document.getElementById('total2');
    // Get the original values
    var originalArmyValue2 = country2Data.army;
    var originalNavyValue2 = country2Data.navy;
    var originalTotalValue2 = country2Data.total;

    // Calculate the initial total army value
    var initialTotalArmy2 = originalArmyValue2;
    armyInputs2.forEach(function(input) {
        initialTotalArmy2 += parseInt(input.value) || 0;
    });
    
    // Calculate the initial total navy value
    var initialTotalNavy2 = originalNavyValue2;
    navyInputs2.forEach(function(input) {
        initialTotalNavy2 += parseInt(input.value) || 0;
    });

    // Update the text content of the army and navy spans with the initial total values
    armySpan2.textContent = initialTotalArmy2;
    navySpan2.textContent = initialTotalNavy2;

    // Calculate the initial total value and update the total span
    var initialTotalValue2 = 240 + initialTotalArmy2 + initialTotalNavy2;
    totalSpan2.textContent = initialTotalValue2;

    // Add event listener to each army input field
    armyInputs2.forEach(function(input) {
        input.addEventListener('input', function() {
            // Calculate the total army value
            var totalArmy2 = originalArmyValue2;
            armyInputs2.forEach(function(input) {
                totalArmy2 += parseInt(input.value) || 0;
            });

            // Update the text content of the army span element
            armySpan2.textContent = totalArmy2;
            
            // Calculate the total value and update the total span
            var totalValue2 = 240 + totalArmy2 + (parseInt(navySpan2.textContent) || 0);
            totalSpan2.textContent = totalValue2;
            if (totalArmy2 != originalArmyValue2) {
                armySpan2.style.color="#b30000";
                totalSpan2.style.color="#b30000";
            } else {
                armySpan2.style.color="black";
                totalSpan2.style.color="black";
            }
        });
    });
    
    // Add event listener to each navy input field
    navyInputs2.forEach(function(input) {
        input.addEventListener('input', function() {
            // Calculate the total navy value
            var totalNavy2 = originalNavyValue2;
            navyInputs2.forEach(function(input) {
                totalNavy2 += parseInt(input.value) || 0;
            });

            // Update the text content of the navy span element
            navySpan2.textContent = totalNavy2;
            
            // Calculate the total value and update the total span
            var totalValue2 = 240 + (parseInt(armySpan2.textContent) || 0) + totalNavy2;
            totalSpan2.textContent = totalValue2;
            if (totalNavy2 != originalNavyValue2) {
                navySpan2.style.color="#b30000";
                totalSpan2.style.color="#b30000";
            } else {
                navySpan2.style.color="black";
                totalSpan2.style.color="black";
            }
        });
    });
    
    if (armySpan2.textContent != originalArmyValue2.toString()) {
        console.log('hi');
        armySpan2.style.color = "#b30000";
        totalSpan2.style.color = "#b30000";
    } else if (navySpan2.textContent != originalNavyValue2.toString()) {
        console.log('hello');
        navySpan2.style.color = "#b30000";
        totalSpan2.style.color = "#b30000";
    } else if (totalSpan2.textContent === originalTotalValue2.toString()) {
        console.log('bye');
        armySpan2.style.color = "black";
        navySpan2.style.color = "black";
        totalSpan2.style.color = "black";
    }
    
});



