import React, { useState } from 'react'
import Navbar from '../Componets/Navbar'
import Sidebar from '../Componets/Sidebar'
import '../Pages/TaxCalculator.css'

const TaxCalculator = () => {

    const [grossSalary, setGrossSalary] = useState(1000000)

    const [otherIncome, setOtherIncome] = useState(2000)

    const [interestIncome, setInterestIncome] = useState(150)

    const [rentalIncome, setRentalIncome] = useState(0)

    const [homeLoanInterest, setHomeLoanInterest] = useState(0)

    const [deduction80C, setDeduction80C] = useState(0)

    const [npsContribution, setNpsContribution] = useState(0)

    const [medicalInsurance, setMedicalInsurance] = useState(0)

    const [donation80G, setDonation80G] = useState(0)

    const [educationLoanInterest, setEducationLoanInterest] = useState(0)

    const [savingInterest, setSavingInterest] = useState(0)

    const [basicSalary, setBasicSalary] = useState(0)

    const [daReceived, setDaReceived] = useState(0)

    const [hraReceived, setHraReceived] = useState(0)

    const [rentPaid, setRentPaid] = useState(0)



    const totalIncome =
        grossSalary +
        otherIncome +
        interestIncome +
        rentalIncome



    const totalDeductions =
        deduction80C +
        npsContribution +
        medicalInsurance +
        donation80G +
        educationLoanInterest +
        savingInterest +
        homeLoanInterest



    let taxableIncome =
        totalIncome - totalDeductions



    if (taxableIncome < 0) {
        taxableIncome = 0
    }



    let estimatedTax = 0



    if (taxableIncome <= 300000) {
        estimatedTax = 0
    }

    else if (taxableIncome <= 700000) {
        estimatedTax = taxableIncome * 0.05
    }

    else if (taxableIncome <= 1000000) {
        estimatedTax = taxableIncome * 0.10
    }

    else {
        estimatedTax = taxableIncome * 0.20
    }



    const taxSaved =
        totalDeductions * 0.20



    return (

        <>

            <div className="section_wrapper">

                <Sidebar />



                <div className="main_section">

                    <Navbar />



                    <div className="section_content">



                        <div className="tax_page">



                            {/* HEADER */}

                            <div className="tax_header">

                                <h2>

                                    Income Tax Calculator

                                </h2>

                                <p>

                                    Estimate your taxable income and tax liability

                                </p>

                            </div>





                            {/* WORKSPACE */}

                            <div className="tax_workspace">



                                {/* INPUTS */}

                                <div className="tax_inputs">



                                    {/* INCOME */}

                                    <div className="tax_section">

                                        <h3>
                                            Income
                                        </h3>



                                        <div className="tax_input_group">

                                            <label>
                                                Gross Salary Income
                                            </label>

                                            <input
                                                type="number"
                                                value={grossSalary}
                                                onChange={(e) =>
                                                    setGrossSalary(Number(e.target.value))
                                                }
                                            />

                                        </div>





                                        <div className="tax_input_group">

                                            <label>
                                                Annual Income From Other Sources
                                            </label>

                                            <input
                                                type="number"
                                                value={otherIncome}
                                                onChange={(e) =>
                                                    setOtherIncome(Number(e.target.value))
                                                }
                                            />

                                        </div>





                                        <div className="tax_input_group">

                                            <label>
                                                Annual Interest Income
                                            </label>

                                            <input
                                                type="number"
                                                value={interestIncome}
                                                onChange={(e) =>
                                                    setInterestIncome(Number(e.target.value))
                                                }
                                            />

                                        </div>

                                    </div>








                                    {/* DEDUCTIONS */}

                                    <div className="tax_section">

                                        <h3>
                                            Deductions
                                        </h3>



                                        <div className="tax_input_group">

                                            <label>
                                                Basic Deductions u/s 80C
                                            </label>

                                            <input
                                                type="number"
                                                value={deduction80C}
                                                onChange={(e) =>
                                                    setDeduction80C(Number(e.target.value))
                                                }
                                            />

                                        </div>





                                        <div className="tax_input_group">

                                            <label>
                                                Contribution to NPS
                                            </label>

                                            <input
                                                type="number"
                                                value={npsContribution}
                                                onChange={(e) =>
                                                    setNpsContribution(Number(e.target.value))
                                                }
                                            />

                                        </div>





                                        <div className="tax_input_group">

                                            <label>
                                                Medical Insurance Premium
                                            </label>

                                            <input
                                                type="number"
                                                value={medicalInsurance}
                                                onChange={(e) =>
                                                    setMedicalInsurance(Number(e.target.value))
                                                }
                                            />

                                        </div>

                                    </div>








                                    {/* HRA */}

                                    <div className="tax_section">

                                        <h3>
                                            HRA Exemption
                                        </h3>



                                        <div className="tax_input_group">

                                            <label>
                                                Basic Salary Received
                                            </label>

                                            <input
                                                type="number"
                                                value={basicSalary}
                                                onChange={(e) =>
                                                    setBasicSalary(Number(e.target.value))
                                                }
                                            />

                                        </div>





                                        <div className="tax_input_group">

                                            <label>
                                                HRA Received
                                            </label>

                                            <input
                                                type="number"
                                                value={hraReceived}
                                                onChange={(e) =>
                                                    setHraReceived(Number(e.target.value))
                                                }
                                            />

                                        </div>





                                        <div className="tax_input_group">

                                            <label>
                                                Total Rent Paid
                                            </label>

                                            <input
                                                type="number"
                                                value={rentPaid}
                                                onChange={(e) =>
                                                    setRentPaid(Number(e.target.value))
                                                }
                                            />


                                            <button className="calculate_tax_btn">

    Calculate Tax

</button>

                                        </div>

                                    </div>

                                </div>








                                {/* RESULTS */}

                                <div className="tax_results">



                                    <div className="tax_result_card">

                                        <p>
                                            Total Income
                                        </p>

                                        <h3>
                                            ₹{Math.round(totalIncome).toLocaleString()}
                                        </h3>

                                    </div>





                                    <div className="tax_result_card">

                                        <p>
                                            Total Deductions
                                        </p>

                                        <h3 className="positive_text">
                                            ₹{Math.round(totalDeductions).toLocaleString()}
                                        </h3>

                                    </div>





                                    <div className="tax_result_card">

                                        <p>
                                            Taxable Income
                                        </p>

                                        <h3>
                                            ₹{Math.round(taxableIncome).toLocaleString()}
                                        </h3>

                                    </div>





                                    <div className="tax_result_card">

                                        <p>
                                            Estimated Tax Liability
                                        </p>

                                        <h3 className="danger_text">
                                            ₹{Math.round(estimatedTax).toLocaleString()}
                                        </h3>

                                    </div>





                                    <div className="tax_result_card">

                                        <p>
                                            Estimated Tax Saved
                                        </p>

                                        <h3 className="positive_text">
                                            ₹{Math.round(taxSaved).toLocaleString()}
                                        </h3>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>

    )

}

export default TaxCalculator