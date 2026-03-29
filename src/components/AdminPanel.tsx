import React, { useState } from 'react';
import { FormSubmission } from '../App';
import { CheckCircle, XCircle, Clock, Search, Edit, Trash, Save } from 'lucide-react';

interface AdminPanelProps {
  submissions: FormSubmission[];
  onUpdateStatus: (id: string, status: 'pending' | 'approved' | 'rejected') => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ submissions, onUpdateStatus }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<FormSubmission>>({});

  const filteredSubmissions = submissions.filter(
    (submission) =>
      submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (submission: FormSubmission) => {
    setEditingId(submission.id);
    setEditForm(submission);
  };

  const handleSave = (id: string) => {
    // In a real application, you would update the submission in the database
    setEditingId(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
        <h2 className="text-xl font-bold text-white">Admin Panel - Form Submissions</h2>
        <p className="text-gray-300">
          Manage and respond to customer inquiries
        </p>
      </div>

      <div className="p-6">
        <div className="mb-6 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search submissions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredSubmissions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No submissions found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Customer
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Message
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSubmissions.map((submission) => (
                  <tr key={submission.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === submission.id ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            name="name"
                            value={editForm.name || ''}
                            onChange={handleChange}
                            className="block w-full px-3 py-1 border border-gray-300 rounded-md text-sm"
                          />
                          <input
                            type="email"
                            name="email"
                            value={editForm.email || ''}
                            onChange={handleChange}
                            className="block w-full px-3 py-1 border border-gray-300 rounded-md text-sm"
                          />
                          <input
                            type="tel"
                            name="phone"
                            value={editForm.phone || ''}
                            onChange={handleChange}
                            className="block w-full px-3 py-1 border border-gray-300 rounded-md text-sm"
                          />
                        </div>
                      ) : (
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {submission.name}
                          </div>
                          <div className="text-sm text-gray-500">{submission.email}</div>
                          <div className="text-sm text-gray-500">{submission.phone}</div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingId === submission.id ? (
                        <textarea
                          name="message"
                          value={editForm.message || ''}
                          onChange={handleChange}
                          rows={3}
                          className="block w-full px-3 py-1 border border-gray-300 rounded-md text-sm"
                        />
                      ) : (
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {submission.message}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(submission.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {submission.createdAt.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2">
                        {editingId === submission.id ? (
                          <button
                            onClick={() => handleSave(submission.id)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Save className="w-5 h-5" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleEdit(submission)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                        )}
                        <button
                          onClick={() => onUpdateStatus(submission.id, 'approved')}
                          className="text-green-600 hover:text-green-900"
                          title="Approve"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => onUpdateStatus(submission.id, 'rejected')}
                          className="text-red-600 hover:text-red-900"
                          title="Reject"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};