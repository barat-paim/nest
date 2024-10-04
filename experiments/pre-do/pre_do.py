import json
import os
from datetime import datetime

class ThoughtOrganizer:
    def __init__(self):
        self.thoughts = []
        self.log_file = 'thought_log.json'
        self.load_thoughts()

    def load_thoughts(self):
        if os.path.exists(self.log_file):
            with open(self.log_file, 'r') as f:
                self.thoughts = json.load(f)

    def save_thoughts(self):
        with open(self.log_file, 'w') as f:
            json.dump(self.thoughts, f, indent=2)

    def add_thought(self, content):
        thought = {
            'content': content,
            'timestamp': datetime.now().isoformat(),
            'processed': False
        }
        self.thoughts.append(thought)
        self.save_thoughts()
        print("Thought captured.")

    def process_thoughts(self):
        for thought in self.thoughts:
            if not thought['processed']:
                # Simulate processing with a simple categorization
                if 'decide' in thought['content'].lower():
                    thought['type'] = 'decision'
                elif 'do' in thought['content'].lower():
                    thought['type'] = 'action'
                else:
                    thought['type'] = 'general'
                thought['processed'] = True
        self.save_thoughts()
        print("Thoughts processed.")

    def generate_log(self):
        action_items = [t['content'] for t in self.thoughts if t.get('type') == 'action']
        decision_items = [t['content'] for t in self.thoughts if t.get('type') == 'decision']
        
        log = "Action Items:\n" + "\n".join(f"- {item}" for item in action_items)
        log += "\n\nDecision Items:\n" + "\n".join(f"- {item}" for item in decision_items)
        
        print("\nGenerated Log:")
        print(log)

def main():
    organizer = ThoughtOrganizer()
    
    while True:
        command = input("\nEnter command (dump/process/log/quit): ").strip().lower()
        
        if command == 'dump':
            thought = input("Enter your thought: ")
            organizer.add_thought(thought)
        elif command == 'process':
            organizer.process_thoughts()
        elif command == 'log':
            organizer.generate_log()
        elif command == 'quit':
            break
        else:
            print("Invalid command. Try again.")

if __name__ == "__main__":
    main()