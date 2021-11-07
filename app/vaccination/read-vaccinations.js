$(document).ready(function() {

    // show list of product on first load
    showVaccinations();
    // when a 'read products' button was clicked
    $(document).on('click', '.read-vaccinations-button', function() {
        showVaccinations();
    });

});

// function to show list of products
function showVaccinations() {
    // get list of products from the API
    $.getJSON("http://localhost/rest_api_auth/api/roles/admin/vaccination/read_vaccinations.php", function(data) {
        // html for listing products
        var read_vaccinations_html = `
        <!-- when clicked, it will load the create vaccination form -->
        <div id='create-vaccination' class='btn btn-primary pull-right m-b-15px create-vaccination-button'>
            <span class='glyphicon glyphicon-plus'></span> Create Vaccination
        </div>
        <!-- start table -->
        <table class='table table-bordered table-hover'>
        
            <!-- creating our table heading -->
            <tr>
                <th class='w-10-pct'>CCCD</th>
                <th class='w-15-pct'>Họ và Tên đêm</th>
                <th class='w-10-pct'>Tên</th>
                <th class='w-10-pct'>Loại vaccine</th>
                <th class='w-10-pct'>Ngày tiêm</th>
                <th class='w-20-pct'>Chú thích</th>
                <th class='w-25-pct text-align-center'>Action</th>
            </tr>`;

        // loop through returned list of data
        $.each(data.records, function(key, val) {

            // creating new table row per record
            read_vaccinations_html += `
            <tr>
                <td>$` + val.cccd + `</td>
                <td>` + val.ho_dem + `</td>
                <td>` + val.ten + `</td>
                <td>` + val.vaccine_name + `</td>
                <td>` + val.date + `</td>
                <td>` + val.note + `</td>
    
                <!-- 'action' buttons -->
                <td>
                    <!-- read vaccination button -->
                    <button class='btn btn-primary m-r-10px read-one-vaccination-button' data-id='` + val.id + `'>
                        <span class='glyphicon glyphicon-eye-open'></span> Read
                    </button>
    
                    <!-- edit button -->
                    <button class='btn btn-info m-r-10px update-vaccination-button' data-id='` + val.id + `'>
                        <span class='glyphicon glyphicon-edit'></span> Edit
                    </button>
    
                    <!-- delete button -->
                    <button class='btn btn-danger delete-vaccination-button' data-id='` + val.id + `'>
                        <span class='glyphicon glyphicon-remove'></span> Delete
                    </button>
                </td>
    
            </tr>`;
        });

        // end table
        read_vaccinations_html += `</table>`;
        // inject to 'page-content' of our app
        $("#page-content").html(read_vaccinations_html);
        // chage page title
        changePageTitle("Read Vaccination");
    });
}