
import React, { useEffect, useState } from 'react'

const EditModal = ({ showEditModal, setshowEditModal, fields, handleUpdate}) => {

    const [editExpenseData, setEditExpenseData] = useState({
        amt: "",
        category: "food",
        date: ""
    })

  
  useEffect(() => {

    if (showEditModal && fields.length > 0) {

  const date = new Date(selectedExpenses.date)

        setEditExpenseData({
            amt: fields[0].value.replace("₹", ""),
            category: fields[1].value,
            date: date.toISOString().split("T")[0]
        })

    }

}, [showEditModal, fields])


    if (!showEditModal) return null


    const handleChange = (e) => {

        const { name, value } = e.target

        setEditExpenseData({
            ...editExpenseData,
            [name]: value
        })

    }


    const handleSubmit = (e) => {

        e.preventDefault()

        handleUpdate(editExpenseData)

    }


    return (

        <div className="modal_overlay">

            <div className="modal">

                {/* HEADER */}

                <div className="modal_header">

                    <h2>
                        Edit Expense
                    </h2>

                    <button
                        type="button"
                        className="close_modal_btn"
                        onClick={() => setshowEditModal(false)}
                    >
                        ✕
                    </button>

                </div>


                {/* FORM */}

                <form
                    className="form"
                    onSubmit={handleSubmit}
                >

                    {/* AMOUNT */}

                    <div className="form_group">

                        <label>
                            Amount
                        </label>

                        <input
                            type="number"
                            name="amt"
                            placeholder="Enter amount"
                            value={editExpenseData.amt}
                            onChange={handleChange}
                        />

                    </div>


                    {/* CATEGORY */}

                    <div className="form_group">

                        <label>
                            Category
                        </label>

                        <select
                            name="category"
                            value={editExpenseData.category}
                            onChange={handleChange}
                        >

                            <option value="food">
                                Food
                            </option>

                            <option value="travel">
                                Travel
                            </option>

                            <option value="bills">
                                Bills
                            </option>

                            <option value="rent">
                                Rent
                            </option>

                            <option value="groceries">
                                Groceries
                            </option>

                            <option value="utilities">
                                Utilities
                            </option>

                            <option value="internet">
                                Internet
                            </option>

                            <option value="medical">
                                Medical
                            </option>

                            <option value="education">
                                Education
                            </option>

                            <option value="transport">
                                Transport
                            </option>

                            <option value="fuel">
                                Fuel
                            </option>

                            <option value="insurance">
                                Insurance
                            </option>

                            <option value="shopping">
                                Shopping
                            </option>

                            <option value="entertainment">
                                Entertainment
                            </option>

                            <option value="dining_out">
                                Dining Out
                            </option>

                            <option value="subscriptions">
                                Subscriptions
                            </option>

                            <option value="tax">
                                Tax
                            </option>

                            <option value="other">
                                Other
                            </option>

                        </select>

                    </div>


                    {/* DATE */}

                    <div className="form_group">

                        <label>
                            Date
                        </label>

                        <input
                            type="date"
                            name="date"
                            value={editExpenseData.date}
                            onChange={handleChange}
                        />

                    </div>


                    {/* BUTTONS */}

                    <div className="form_actions">

                        <button
                            type="button"
                            className="cancel_btn"
                            onClick={() => setshowEditModal(false)}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="save_btn"
                        >
                            Update Expense
                        </button>

                    </div>

                </form>

            </div>

        </div>
    )
}

export default EditModal