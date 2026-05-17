CREATE TABLE plans (
    id INT AUTO_INCREMENT PRIMARY KEY,

    initial_amount BIGINT NOT NULL,
    monthly_amount INT NOT NULL,
    start_date DATE NOT NULL,
    period INT NOT NULL,
    expected_return DECIMAL(5,4) NOT NULL,
    target_amount BIGINT NOT NULL,

    payment_day TINYINT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE project_plans (
    project_id INT NOT NULL,
    plan_id INT NOT NULL UNIQUE,
    version INT NOT NULL DEFAULT 1,

    PRIMARY KEY (project_id, plan_id),
    UNIQUE (project_id, version),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (plan_id) REFERENCES plans(id) ON DELETE CASCADE
);
