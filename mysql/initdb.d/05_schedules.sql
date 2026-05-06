CREATE TABLE payment_schedules (
    id INT AUTO_INCREMENT PRIMARY KEY,

    sequence INT NOT NULL,
    expected_date DATE NOT NULL,
    expected_amount INT NOT NULL,
    status ENUM('PENDING', 'PAID', 'MISSED', 'SKIPPED') DEFAULT 'PENDING',
    actual_paid_amount INT,
    actual_paid_date DATETIME,

    project_id INT NOT NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE payment_allocation (
    schedule_id INT,
    item_id INT,

    expected_amount INT NOT NULL,
    status ENUM('PENDING', 'PAID', 'MISSED', 'SKIPPED') DEFAULT 'PENDING',
    actual_paid_amount INT,

    PRIMARY KEY (schedule_id, item_id),
    FOREIGN KEY (schedule_id) REFERENCES payment_schedules(id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE
);
