import React, { useEffect, useState } from 'react'
import DeleteModal from './DeleteModal'
import EditModal from './EditModel'

const DetailsModel = ({ showDetailsModel, setshowDetailsModel, title, fields, handleDelete, handleEdit  }) => {

    const [showDeleteModal, setshowDeleteModal] = useState(false)
    const [showEditModal, setshowEditModal] = useState(false)

    useEffect(() => {
        if (!showDetailsModel) {
            setshowDeleteModal(false)
        }
    }, [showDetailsModel])

    if (!showDetailsModel) return null
    return (

        <>


            <div className="modal_overlay">

                <DeleteModal
                    showDeleteModal={showDeleteModal}
                    setshowDeleteModal={setshowDeleteModal}
                    handleDelete={handleDelete}
                />

                <EditModal
                  showEditModal={showEditModal}
                  setshowEditModal={setshowEditModal}
                  fields={fields}
                  handleUpdate={handleEdit}

                  
                />

                <div className="modal">

                    <div className="modal_header">

                        <h2>{title}</h2>

                        <button
                            className="close_modal_btn"
                            onClick={() => setshowDetailsModel(false)}
                        >
                            ✕
                        </button>

                    </div>

                    <div className="details_body">

                        {fields.map((field) => (
                            <div
                                className="details_row"
                                key={field.label}
                            >

                                <span className="details_label">
                                    {field.label}
                                </span>

                                <span className="details_value">
                                    {field.value}
                                </span>

                            </div>
                        ))}

                    </div>

                    <div className="form_actions">

                        <button className="cancel_btn" onClick={() => setshowDetailsModel(false)} >
                            Close
                        </button>

                        <button className="save_btn" onClick={()=> setshowEditModal(true)} >
                            Edit
                        </button>

                        <button className="delete_btn" onClick={() => setshowDeleteModal(true)}  >
                            Delete
                        </button>

                    </div>

                </div>

            </div>
        </>

    )
}

export default DetailsModel