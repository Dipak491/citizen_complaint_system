package com.citizen.complaint.repository;

import com.citizen.complaint.entity.Complaint;
import com.citizen.complaint.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    List<Complaint> findByUser(User user);
    List<Complaint> findByUserOrderByIdDesc(User user);
    List<Complaint> findAllByOrderByIdDesc();
}
