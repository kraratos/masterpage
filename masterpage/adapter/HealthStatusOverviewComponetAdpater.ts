export class HealthStatusOverviewAdapter {
    chartColor: any[] = [
        {
            categoryName: "ABC",

            color: "#ae75ba"
        },
        {
            categoryName: "AB12C",

            color: "#4da2a9"
        },
        {
            categoryName: "AB",

            color: "#da8b80"
        },
        {
            categoryName: "OTHER",

            color: "#d0d0d0"
        }
    ]
    constructor() {

    }
    convertWidgeta(widgetData: any): any {
        var chart: any[] = [];
        var dataValues: any[] = [];
        var data = {}
        if (widgetData?.data){
            var i=0;
            widgetData?.data?.operatingHours?.forEach((obj: any,index:number) => {
                var opPercentage =(obj.opHours *100 ) / widgetData.data.runningHours;
                var color = this.chartColor[i].color;
                if(i==chart.length)i=0;
                else
                    i++;
                
                chart.push({
                    categoryName: obj.opBurnerMode,
                    noOfElement: obj.opHours,
                    color: color
                })
                dataValues.push({ column1: '<b>' + obj.opBurnerMode + '</b>', column2: obj.opHours, column3: (Math.ceil(opPercentage*10000)/10000).toFixed(4)+"%" })
            })
            data = {
                chart: [...chart],
                info1: "<b>Actual Burner Mode</b> -" +widgetData?.data?.burnerMode,
                info2: "<b>Control</b> - ",
                graphAnnotationText: '<b style="font-size: 18px;font-weight:bold; font-family:"Poppins" ">'+widgetData?.data?.runningHours+'</b><br><span style="font-size: 16px; font-weight: normal; font-family:"Poppins-Regular" ">Hours</span>',
                graphTextInfo: "none",
             //   graphTextPosition: "outside",
                table: {
                    header: [
                        { "label": "", "width": 170 },
                        { "label": "Running Hours", "width": 170 },
                        { "label": "Percentage", "width": 170 }
                    ],
    
                    data: [...dataValues]
                }
    
            }
        }
        return data;
    }
}