function getRequests() {
    $.getJSON("http://localhost:8080/requests")
        .done(function (json) {
            json.forEach(function (request) {
                $('#requestList').append(
                    `<li><a href="/requests/${request.id}">${request.title}</a></li>`
                );
            });
        })
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
        });
}