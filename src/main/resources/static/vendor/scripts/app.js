var url = "http://localhost:8080"

function getRequests() {
    $.getJSON(url + "/requests")
        .done(function (json) {
            $('#requestList').html("");
            json.forEach(function (request) {
                $('#requestList').append(
                    `<a     
                            id="request-${request.id}"
                            href="javascript:void(0)"
                            class="list-group-item list-group-item-action">
                            ${request.title}
                            </a>
                    <button class="btn btn-info" onclick="getDetails(${request.id})">show details</button>
                    <button class="btn btn-info" onclick="getRequests()">hide details</button>
                    <button class="btn btn-danger" onclick="deleteRequest(${request.id})">delete request</button>`
                );
            });
        })
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
        });
}

async function getDetails(id) {
    let html_element = $(`#request-${id}`)
    const response = await fetch(`${url}/requests/${id}`);
    const request = await response.json();
    let formTemplate = document.getElementById('form-template').content.cloneNode(true);
    formTemplate.querySelector("form").setAttribute("action", `/requests/${id}/`);
    formTemplate.querySelector("form").addEventListener('submit', function (event) {
        event.preventDefault();
        let item_name = $(this).find('input[name="name"]').val();
        addElement(request.id, item_name);
    });
    $(html_element).html(
        `<a>${request.title}</a>`
    );
    // assigment constraint
    if (request.elements.length >= 2) {
        request.elements.forEach(function (element) {
            // load template and then changes the content of the item list and adds the delete function to the button
            let elementTemplate = document.getElementById('multiple-element-template').content.cloneNode(true);
            elementTemplate.querySelector("a").innerHTML = element.name;
            elementTemplate.querySelector("button").addEventListener('click', function () {
                deleteElement(request.id, element.id);
            }, true);
            $(html_element).append(elementTemplate);
        });
    } else {
        let elementTemplate = document.getElementById('single-element-template').content.cloneNode(true);
        elementTemplate.getElementById("element").innerHTML = `${request.elements[0].name}`;
        $(html_element).append(elementTemplate);
    }
    // adds a new line and the 'new item' form below the item
    $(html_element).append('<br>');
    $(html_element).append(formTemplate);
}

async function deleteElement(request_id, element_id) {
    console.log(`delete ${url}/requests/${request_id}/${element_id}`);
    const response = await fetch(`${url}/requests/${request_id}/${element_id}`, {method: "DELETE",});
    const request = await response.json();
    if (request.status != "200") {
        console.log("Something went wrong server side");
        console.log(request);
    }
    await getDetails(request_id);
}

async function deleteRequest(request_id) {
    if (confirm("Do you really want to delete the request?")) {
        console.log(`delete ${url}/requests/${request_id}`);
        const response = await fetch(`${url}/requests/${request_id}`, {method: "DELETE",});
        const request = await response.json();
        if (request.status != "200") {
            console.log("Something went wrong server side");
            console.log(request);
        }
    }
    await getRequests();
}

async function addElement(request_id, element_name) {
    console.log(`post ${url}/requests/${request_id}/${element_name}`);
    const response = await fetch(`${url}/requests/${request_id}/${element_name}`, {method: "POST",});
    const request = await response.json();
    if (request.status != "200") {
        console.log("Something went wrong server side");
        console.log(request);
    }
    await getDetails(request_id);
}

$("#submitForm").submit(function (event) {
    event.preventDefault(); //prevent default action
    const post_url = $(this).attr("action"); //get form action url
    const request_method = $(this).attr("method"); //get form GET/POST method
    const form_data = new FormData(this); //Creates new FormData object
    $.ajax({
        url: post_url,
        type: request_method,
        data: form_data,
        contentType: false,
        cache: false,
        processData: false
    }).done(function (response) { //
        $("#server-results").html(response);
    });
});