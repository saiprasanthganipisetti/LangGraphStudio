import unittest
from policy import validate_capacity, may_prepare_emails

class PolicyTests(unittest.TestCase):
    def setUp(self):
        self.members = [
            {"member_id": "a", "name": "Asha", "weekly_capacity_hours": 5},
            {"member_id": "b", "name": "Bala", "weekly_capacity_hours": 8},
        ]

    def test_capacity_passes(self):
        tasks = [{"task_id": "T1", "proposed_owner_id": "a", "estimated_hours": 3}]
        self.assertEqual(validate_capacity(tasks, self.members), [])

    def test_capacity_overrun(self):
        tasks = [{"task_id": "T1", "proposed_owner_id": "a", "estimated_hours": 6}]
        self.assertTrue(validate_capacity(tasks, self.members))

    def test_unknown_owner(self):
        tasks = [{"task_id": "T1", "proposed_owner_id": "ghost", "estimated_hours": 1}]
        self.assertTrue(validate_capacity(tasks, self.members))

    def test_email_gate(self):
        self.assertFalse(may_prepare_emails({"status": "pending"}))
        self.assertFalse(may_prepare_emails({"status": "rejected"}))
        self.assertTrue(may_prepare_emails({"status": "approved"}))

if __name__ == "__main__":
    unittest.main()
