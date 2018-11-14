$(document).ready(function () {

    //extract whatever is inside of the script tag with an id of employee-modal-template
    var source = $("#employee-modal-template").html();

    var employee_modal_template = Handlebars.compile(source);

    var employeeResourceURI= "http://localhost:8081/employeeservice/employee"

    //retrieve all the employees from server then display them on the homepage
    // if server doesn't return any employees for some reason, the homepage will not have a list of employees displayed.
    $.getJSON(employeeResourceURI, function (employees) {

        for (var i = 0; i < employees.length; i++) {

            var employeeData = {
                employeeID: ""+employees[i].gid,
                employeeName: ""+employees[i].firstName + " " + employees[i].lastName,
                employeeSalary: "$100,000" //since employee salary is not returned by server
            };

            //replace all the variables within the compiled script tag above with each value of employee data.
            var employeeElementToAppend = employee_modal_template(employeeData);

            //embed the html element which contains employee information into the html div tag with id 'content'
            $("#content").append(employeeElementToAppend);

        }

    });




    //submit the add employee form to the server
    $('form').submit(function (event) {

        /**
         * salary and privilege are not sent to the server since there is no endpoint that accepts those parameters
         * @type {{firstName: *, lastName: *}}
         */
        var formData = {
            'firstName': getFirstName(),
            'lastName': getLastName()
        };

        $.ajax({
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: employeeResourceURI,
            data: JSON.stringify(formData),
            dataType: 'json',
            encode: true
        }).done(function(returnedData){

            alert("Employee has been added");

        });
        event.preventDefault(); // waits for a response from server before proceeding with the rest of the code

    });


    function getFirstName() {
        var fullName = getFullName();
        return fullName.split(" ")[0];

    }

    function getLastName() {
        var fullName = getFullName();
        return fullName.split(" ")[1];

    }
    function getFullName(){
        return $("input[name=newFullName]").val();

    }

    function getSalary(){
        return $("input[name=newSalary]").val();


    }

    function getPrivileges(){
        return $("input[name=newPrivileges]").val();
    }




});