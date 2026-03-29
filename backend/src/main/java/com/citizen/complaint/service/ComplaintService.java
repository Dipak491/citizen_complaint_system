package com.citizen.complaint.service;

import com.citizen.complaint.dto.ComplaintRequest;
import com.citizen.complaint.dto.ComplaintResponse;
import com.citizen.complaint.entity.Complaint;
import com.citizen.complaint.entity.User;
import com.citizen.complaint.repository.ComplaintRepository;
import com.citizen.complaint.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final UserRepository userRepository;

    public ComplaintService(ComplaintRepository complaintRepository,
                            UserRepository userRepository) {
        this.complaintRepository = complaintRepository;
        this.userRepository = userRepository;
    }

    public ComplaintResponse createComplaint(ComplaintRequest request, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Complaint complaint = new Complaint();
        complaint.setTitle(request.getTitle());
        complaint.setDescription(request.getDescription());
        complaint.setCategory(request.getCategory());
        complaint.setStatus("PENDING");
        complaint.setUser(user);
        return ComplaintResponse.fromEntity(complaintRepository.save(complaint));
    }

    public List<ComplaintResponse> getMyComplaints(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return complaintRepository.findByUserOrderByIdDesc(user)
                .stream().map(ComplaintResponse::fromEntity).collect(Collectors.toList());
    }

    public List<ComplaintResponse> getAllComplaints() {
        return complaintRepository.findAllByOrderByIdDesc()
                .stream().map(ComplaintResponse::fromEntity).collect(Collectors.toList());
    }

    public ComplaintResponse getComplaintById(Long id) {
        return ComplaintResponse.fromEntity(
                complaintRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Complaint not found with id: " + id)));
    }

    public ComplaintResponse updateStatus(Long id, String status) {
        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found with id: " + id));
        complaint.setStatus(status);
        return ComplaintResponse.fromEntity(complaintRepository.save(complaint));
    }

    public void deleteComplaint(Long id) {
        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found with id: " + id));
        complaintRepository.delete(complaint);
    }
}
