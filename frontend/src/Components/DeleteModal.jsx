import React from 'react'

const DeleteModal = ({ showDeleteModal, setshowDeleteModal, handleDelete }) => {

    if (!showDeleteModal) return null

    return (
        <>
            <div className="confirm_overlay">

                <div className="confirm_modal">

                    <div className="confirm_icon">
                        🗑️
                    </div>

                    <h2>Are you sure?</h2>

                    <p>             This action cannot be undone</p>

                    <div className="confirm_actions">

                        <button
                            className="confirm_cancel_btn"
                            onClick={() => setshowDeleteModal(false)}
                        >
                            Cancel
                        </button>

                        <button
                            className="confirm_delete_btn"
                            onClick={handleDelete}   >
                            Delete
                        </button>

                    </div>

                </div>

            </div>


        </>
    )
}

export default DeleteModal