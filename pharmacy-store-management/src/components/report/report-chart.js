import {useEffect, useState} from "react";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import Select from 'react-select';
import {format, parse} from 'date-fns';
import {toast} from "react-toastify";
import {seeChartRevenueAndProfit} from "../../utils/ReportService/ReportService";
import {Link} from "react-router-dom";
import styled from 'styled-components';

const timeOptions = [
    {value: 'year', label: 'Năm'},
    {value: 'month', label: 'Tháng'},
    {value: 'week', label: 'Tuần'},
];

const monthOptions = Array.from({length: 12}, (_, i) => ({
    value: i + 1,
    label: `Tháng ${i + 1}`,
}));

const yearOptions = Array.from({length: new Date().getFullYear() - 1999}, (_, i) => ({
    value: new Date().getFullYear() - i,
    label: new Date().getFullYear() - i,
}));


const StyleReportChart = styled.div`
  .LoiTH-chart legend {
    all: revert;
  }

  .LoiTH-chart fieldset {
    width: 100%;
    margin-bottom: 20px;
  }

  .LoiTH-chart .form-group {
    display: flex;
    /*justify-content: space-between;*/
  }

  .LoiTH-chart .form-group div:last-child {
    margin-right: 0;
  }

  .LoiTH-chart .form-group div {
    margin-right: 140px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .LoiTH-chart .report {
    display: flex;
  }

  .LoiTH-chart .report .debt {
    margin: auto 150px;
  }

  .LoiTH-chart .report .list {
    margin: auto 150px;
  }

  .LoiTH-chart .action {
    display: flex;
    justify-content: space-between;
  }

  .LoiTH-chart .action .chart {
    margin-right: 660px;
    margin-left: 20px;
  }

  .LoiTH-chart .detail-report {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .LoiTH-chart .revenue,
  .LoiTH-chart .profit {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-right: 20px;
  }

  .LoiTH-chart .revenue input,
  .LoiTH-chart .profit input {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 171px;
  }

  .LoiTH-chart .revenue label,
  .LoiTH-chart .profit label {
    margin-bottom: 5px;
    width: 100%;
  }

  .LoiTH-chart label, .LoiTH-chart select {
    margin-right: 5px;
  }

  .LoiTH-chart select {
    padding: 3px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }

  .LoiTH-chart #displayTime {
    margin-top: 10px;
  }

  .LoiTH-chart .time-selector {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .LoiTH-chart #fieldset-time {
    height: 170px;
    display: flex;
    flex-direction: column;  /* Hiển thị các thành phần theo chiều dọc */
    align-items: flex-start;  /* Canh trái các thành phần trong #fieldset-time */
    gap: 10px;
    position: relative;
  }

  .LoiTH-chart #fieldset-repot {
    height: 230px;
  }

  .LoiTH-chart #fieldset-chart {
    height: 420px;
  }

  .LoiTH-chart #timeValue, .LoiTH-chart #yearValue {
    display: none;
  }

  .LoiTH-chart .col-4 {
    margin-top: 25px;
  }

  .LoiTH-chart .col-6 {
    margin-top: 25px;
  }

  .LoiTH-chart .button-view-chart {
    position: absolute;
    bottom: 10px;
    right: 10px;
    display: inline-block;
    padding: 3px 7px;
    font-size: 14px;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    border: 2px solid #123456;
    color: white;
    background-color: #123456;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;
    height: 30px;
    line-height: 24px;
  }


`;
export const ReportChart = () => {
    const [data, setData] = useState([]);

    const [selectedTimeOption, setSelectedTimeOption] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    //Weekk
    const [selectedWeek, setSelectedWeek] = useState(null);
    const [weekOptions, setWeekOptions] = useState([]);
    //Từ ngày đến ngày
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [showChart, setShowChart] = useState(false);

    //Báo cáo chi tiết
    const [revenue, setRevenue] = useState(0);
    const [profit, setProfit] = useState(0);
    const [averageRevenue, setAverageRevenue] = useState(0);
    const [averageProfit, setAverageProfit] = useState(0);


    const calculateWeeksInYear = (year) => {
        const weeks = [];
        let currentDate = new Date(year, 0, 1);
        while (currentDate.getFullYear() === year) {
            weeks.push({value: weeks.length + 1, label: `Tuần ${weeks.length + 1}`});
            currentDate.setDate(currentDate.getDate() + 7);
        }
        return weeks;
    };

    const handleTimeChange = (selectedOption) => {
        setStartDate(null)
        setEndDate(null)
        setSelectedTimeOption(selectedOption);
        setSelectedMonth(null);
        setSelectedYear(null);
    };
    const handleWeekChange = (selectedWeek) => {
        setSelectedWeek(selectedWeek);
        if (selectedWeek && selectedYear) {
            const startOfWeek = new Date(selectedYear.value, 0, 1);
            startOfWeek.setDate(startOfWeek.getDate() + (selectedWeek.value - 1) * 7 - startOfWeek.getDay());
            setStartDate(format(startOfWeek, 'dd/MM/yyyy'));
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(endOfWeek.getDate() + 6);
            setEndDate(format(endOfWeek, 'dd/MM/yyyy'));
        }
    };

    const handleMonthChange = (selectedMonth) => {
        setSelectedMonth(selectedMonth);
    };

    const handleYearChange = (selectedYear) => {
        if (selectedTimeOption && selectedTimeOption.value === 'week' && selectedYear) {
            const weeks = calculateWeeksInYear(selectedYear.value);
            setWeekOptions(weeks);
        }
        setSelectedYear(selectedYear);
    };

    useEffect(() => {
        if (selectedTimeOption) {
            setStartDate(null);
            setEndDate(null);

            if (selectedTimeOption.value === 'year' && selectedYear) {
                setStartDate(`01/01/${selectedYear.value}`);
                setEndDate(`31/12/${selectedYear.value}`);
            } else if (selectedTimeOption.value === 'month' && selectedMonth && selectedYear) {
                const lastDay = new Date(selectedYear.value, selectedMonth.value, 0).getDate();
                setStartDate(`01/${selectedMonth.value}/${selectedYear.value}`);
                setEndDate(`${lastDay}/${selectedMonth.value}/${selectedYear.value}`);
            } else if (selectedTimeOption.value === 'week' && selectedYear && selectedWeek) {
                const startOfWeek = new Date(selectedYear.value, 0, 1);
                startOfWeek.setDate(startOfWeek.getDate() + (selectedWeek.value - 1) * 7 - startOfWeek.getDay());
                setStartDate(format(startOfWeek, 'dd/MM/yyyy'));
                const endOfWeek = new Date(startOfWeek);
                endOfWeek.setDate(endOfWeek.getDate() + 6);
                setEndDate(format(endOfWeek, 'dd/MM/yyyy'));
            }
        }
    }, [selectedTimeOption, selectedYear, selectedMonth, selectedWeek]);
    const displayTime = () => {
        if (startDate && endDate) {
            return `Từ ${startDate} đến ${endDate}`;
        }
        return '';
    };

    function convertDateFormat(date) {
        const parsedDate = parse(date, 'dd/MM/yyyy', new Date());
        return format(parsedDate, 'yyyy-MM-dd');
    }

    const handleViewChart = async () => {

        if (!selectedTimeOption) {
            toast.warning('Vui lòng chọn loại thời gian báo cáo.');
            return;
        }

        if (selectedTimeOption.value === 'year' && !selectedYear) {
            toast.warning('Vui lòng chọn năm.');
            return;
        }

        if (selectedTimeOption.value === 'month') {
            if (!selectedYear && !selectedMonth) {
                toast.warning('Vui lòng chọn năm và tháng.');
                return;
            }
            if (!selectedYear) {
                toast.warning('Vui lòng chọn năm.');
                return;
            }
            if (!selectedMonth) {
                toast.warning('Vui lòng chọn tháng.');
                return;
            }
        }

        if (selectedTimeOption.value === 'week') {
            if (!selectedYear && !selectedWeek) {
                toast.warning('Vui lòng chọn năm và tuần.');
                return;
            }
            if (!selectedYear) {
                toast.warning('Vui lòng chọn năm.');
                return;
            }
            if (!selectedWeek) {
                toast.warning('Vui lòng chọn tuần.');
                return;
            }
        }
        try {
            console.log(selectedTimeOption.value, convertDateFormat(startDate), convertDateFormat(endDate))
            const result = await seeChartRevenueAndProfit(selectedTimeOption.value,
                convertDateFormat(startDate), convertDateFormat(endDate));
            setData(result)
            console.log(result);

            const totalRevenue = result.reduce((total, item) => total + parseFloat(item.revenue), 0);
            const totalProfit = result.reduce((total, item) => total + parseFloat(item.profit), 0);

            const averageRevenue = totalRevenue / result.length;
            const averageProfit = totalProfit / result.length;

            setRevenue(totalRevenue);
            setProfit(totalProfit);
            setAverageRevenue(averageRevenue);
            setAverageProfit(averageProfit);
        } catch (error) {
            console.error("Error fetching grades:", error);
        }
        setShowChart(true);
    };

    function formatCurrency(value) {
        return new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(value);
    }

    return (
        <StyleReportChart>
            <div className="LoiTH-chart">
            <div className="container">
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-4">
                        <div>
                            <fieldset className="border rounded-3 p-3" id="fieldset-time">
                                <legend><b>Thời gian</b></legend>
                                <div className="time-selector">
                                    <Select value={selectedTimeOption} onChange={handleTimeChange}
                                            options={timeOptions} placeholder="Chọn loại thời gian"/>
                                    {selectedTimeOption && selectedTimeOption.value === 'year' && (
                                        <Select
                                            value={selectedYear} onChange={handleYearChange}
                                            options={yearOptions} placeholder="Năm"/>
                                    )}
                                    {(selectedTimeOption && selectedTimeOption.value === 'month') && (
                                        <>
                                            <Select value={selectedMonth} onChange={handleMonthChange}
                                                    options={monthOptions} placeholder="Tháng"/>
                                            <Select value={selectedYear} onChange={handleYearChange}
                                                    options={yearOptions} placeholder="Năm"/>
                                        </>
                                    )}

                                    {selectedTimeOption && selectedTimeOption.value === 'week' && (
                                        <>
                                            <Select value={selectedYear} onChange={handleYearChange}
                                                    options={yearOptions} placeholder="Năm"/>
                                            <Select value={selectedWeek} onChange={handleWeekChange}
                                                    options={weekOptions} placeholder="Tuần"/>
                                        </>
                                    )}
                                </div>
                                <p>{displayTime()}</p>
                                <button className="button-view-chart" onClick={handleViewChart}>
                                    <i className="bi bi-bar-chart"> </i> Xem báo cáo và biểu đồ
                                </button>
                            </fieldset>
                        </div>
                        <div>
                            <fieldset className="border rounded-3 p-3" id="fieldset-repot">
                                <legend><b>Báo cáo chi tiết</b></legend>
                                {showChart ? (
                                    <div className="detail-report">
                                        <div className="revenue">
                                            <label htmlFor="revenue">Doanh thu</label>
                                            <input type="text" name="" id="revenue" value={formatCurrency(revenue)}
                                                   readOnly/>
                                        </div>

                                        <div className="profit">
                                            <label htmlFor="profit">Lợi nhuận</label>
                                            <input type="text" name="" id="profit" value={formatCurrency(profit)}
                                                   readOnly/>
                                        </div>

                                        <div className="revenue">
                                            <label htmlFor="medium-revenue">Doanh thu TB</label>
                                            <input type="text" name="" id="medium-revenue"
                                                   value={formatCurrency(averageRevenue)} readOnly/>
                                        </div>

                                        <div className="profit">
                                            <label htmlFor="medium-profit">Lợi nhuận TB</label>
                                            <input type="text" name="" id="medium-profit"
                                                   value={formatCurrency(averageProfit)} readOnly/>
                                        </div>
                                    </div>
                                ) : (
                                    <p>Chưa có dữ liệu</p>
                                )
                                }
                            </fieldset>
                        </div>
                    </div>
                    <div className="col-6">
                        <div>
                            <fieldset className="border rounded-3 p-3" id="fieldset-chart">
                                <legend><b>Biểu đồ Doanh thu và Lợi nhuận</b></legend>
                                {showChart ? (
                                    data.length > 0 ? (
                                        <ResponsiveContainer className="chart" height={300}>
                                            <LineChart width={600} height={300} data={data}
                                                       margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                                                <XAxis dataKey="date"/>
                                                {/*<YAxis/>*/}
                                                <YAxis tickFormatter={(value) => `${value}\u00A0₫`}/>                                                <CartesianGrid strokeDasharray="3 3"/>
                                                <Tooltip/>
                                                <Legend/>
                                                <Line type="monotone" dataKey="revenue" stroke="#8884d8"
                                                      activeDot={{r: 8}} name="Doanh thu"/>
                                                <Line type="monotone" dataKey="profit" stroke="#82ca9d"
                                                      name="Lợi nhuận"/>
                                            </LineChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <p>Chưa có dữ liệu</p>
                                    )
                                ) : (
                                    <p>Chưa có dữ liệu</p>
                                )}
                            </fieldset>
                        </div>
                        <Link to="/">
                            <button style={{float:"right"}} type="button" className="btn btn-primary"><i
                                className="bi bi-arrow-return-left"></i> Trở về
                            </button>
                        </Link>
                    </div>
                    <div className="col-1"></div>
                </div>
            </div>
            </div>
        </StyleReportChart>
    );
}
