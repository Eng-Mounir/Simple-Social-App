import React, { useState } from 'react';
import { Modal, ModalContent } from "@heroui/react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { changePassword } from '../../services/authServices';
import { toast } from 'react-toastify';
export default function ChangePasswordModal({ isOpen, onOpenChange }) {
  const [currentPwd, setCurrentPwd]   = useState("");
  const [newPwd, setNewPwd]           = useState("");
  const [confirmPwd, setConfirmPwd]   = useState("");
  const [pwdLoading, setPwdLoading]   = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNewPwd, setShowNewPwd]   = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  async function handleChangePassword() {
    if (!currentPwd || !newPwd || !confirmPwd)
      return toast.error("Please fill in all fields");
    if (newPwd !== confirmPwd)
      return toast.error("New passwords do not match");

    try {
      setPwdLoading(true);
      // ✅ Backend only needs password + newPassword (PATCH)
      await changePassword(currentPwd, newPwd);
      toast.success("Password changed successfully");
      onOpenChange(false);
      setCurrentPwd(""); setNewPwd(""); setConfirmPwd("");
    } catch (err) {
      console.error(err);
      window.alert(
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to change password."
      );
    } finally {
      setPwdLoading(false);
    }
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
      <ModalContent>
        {(onClose) => (
          <div className="up-modal-inner">
            <div className="up-modal-header">
              <div className="up-modal-icon"><FaLock /></div>
              <div className='text-white'>
                <h3 className="up-modal-title text-white">Change Password</h3>
                <p className="up-modal-sub">Keep your account secure</p>
              </div>
            </div>

            <div className="up-field-group">
              <label className="up-field-label">Current Password</label>
              <div className="up-field-wrap">
                <input
                  type={showCurrent ? "text" : "password"}
                  placeholder="Enter current password"
                  value={currentPwd}
                  onChange={(e) => setCurrentPwd(e.target.value)}
                  className="up-field-input"
                />
                <button type="button" className="up-field-toggle"
                  onClick={() => setShowCurrent((s) => !s)}>
                  {showCurrent ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="up-field-group">
              <label className="up-field-label">New Password</label>
              <div className="up-field-wrap">
                <input
                  type={showNewPwd ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPwd}
                  onChange={(e) => setNewPwd(e.target.value)}
                  className="up-field-input"
                />
                <button type="button" className="up-field-toggle"
                  onClick={() => setShowNewPwd((s) => !s)}>
                  {showNewPwd ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="up-field-group">
              <label className="up-field-label">Confirm New Password</label>
              <div className="up-field-wrap">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmPwd}
                  onChange={(e) => setConfirmPwd(e.target.value)}
                  className="up-field-input"
                />
                <button type="button" className="up-field-toggle"
                  onClick={() => setShowConfirm((s) => !s)}>
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="up-modal-divider" />

            <div className="up-modal-actions">
              <button className="up-modal-cancel" onClick={onClose}>Cancel</button>
              <button
                className="up-modal-save"
                onClick={handleChangePassword}
                disabled={pwdLoading}
              >
                {pwdLoading ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}