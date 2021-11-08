$(document).ready(function() {

    // handle 'read one' button click
    $(document).on('click', '.read-one-vaccination-button', function() {
        // get vaccination id
        var id = $(this).attr('data-id');
        // read vaccination record based on given ID
        $.getJSON("http://localhost/New%20folder%20(2)/vaccine-manager/api/roles/admin/vaccination/read_one_vaccination.php?id=" + id, function(vaccination) {
            $.getJSON("http://localhost/New%20folder%20(2)/vaccine-manager/api/roles/admin/vaccine/read_one.php?id=" + vaccination.vaccine_id, function(vaccine) {
                $.getJSON("http://localhost/New%20folder%20(2)/vaccine-manager/api/roles/admin/health_center/read_one.php?id=" + vaccination.health_center_id, function(center) {
                    //do stuff with 'data' and 'data2'

                    // start html
                    var read_one_vaccination_html = `
                    <!-- when clicked, it will show the vaccination's list -->
                    <div id='read-vaccinations' class='btn btn-primary pull-right m-b-15px read-vaccinations-button'>
                        <span class='glyphicon glyphicon-list'></span> Read Vaccinations
                    </div>
                    <!-- vaccination data will be shown in this table -->
                    <table class='table table-bordered table-hover'>
                    
                        <!-- vaccination name -->
                        <tr>
                            <td class='w-30-pct'>CCCD</td>
                            <td class='w-70-pct'>` + vaccination.cccd + `</td>
                        </tr>
                    
                        <!-- vaccination price -->
                        <tr>
                            <td>Vaccine</td>
                            <td>` + vaccine.name + `</td>
                        </tr>

                        <!-- vaccination price -->
                        <tr>
                            <td>Cơ sở y tế</td>
                            <td>` + center.name + `</td>
                        </tr>

                        <!-- vaccination price -->
                        <tr>
                            <td>Lần tiêm</td>
                            <td>` + vaccination.vaccinate_no.split("-").reverse().join("/") + `</td>
                        </tr>

                        <!-- vaccination price -->
                        <tr>
                            <td>Ngày tiêm</td>
                            <td>` + vaccination.date + `</td>
                        </tr>
                    
                        <!-- vaccination description -->
                        <tr>
                            <td>Ghi chú</td>
                            <td>` + vaccination.note + `</td>
                        </tr>
                    
                        
                    
                    </table>`;
                    // inject html to 'page-content' of our app
                    $("#page-content").html(read_one_vaccination_html);

                    // chage page title
                    changePageTitle("Read Vaccination");
                });
            });
        });
    });

});