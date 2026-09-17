import { aiService } from '../lib/ai-service';
import { BENGALURU_PROVIDERS } from '../data/providers';
import { SAMPLE_REPORTS } from '../data/sampleReports';

async function runPawCareTests() {
  console.log('🐾 Running PawCare Automated Test Suite...\n');

  // Test 1: Verify providers data
  console.log(`1. Testing Providers Data: Found ${BENGALURU_PROVIDERS.length} Bengaluru animal-care providers.`);
  if (BENGALURU_PROVIDERS.length < 8) {
    throw new Error('Expected at least 8 providers for Bengaluru');
  }
  const emergencyProviders = BENGALURU_PROVIDERS.filter((p) => p.isEmergency24x7);
  console.log(`   ✓ Found ${emergencyProviders.length} 24/7 emergency & ICU providers.`);

  // Test 2: AI Workflow 1 - Report Simplification
  console.log('\n2. Testing AI Workflow 1: Medical Report Simplification...');
  const cbcReport = await aiService.simplifyReport(SAMPLE_REPORTS[0].id);
  console.log(`   ✓ Pet: ${cbcReport.petName} (${cbcReport.species})`);
  console.log(`   ✓ Biomarkers count: ${cbcReport.biomarkers.length}`);
  console.log(`   ✓ Layman summary generated: "${cbcReport.laymanSummary.substring(0, 60)}..."`);

  // Test 3: AI Workflow 2 - Vet Question Generator
  console.log('\n3. Testing AI Workflow 2: Vet Question Generator...');
  const questions = await aiService.generateAdditionalQuestions(cbcReport);
  console.log(`   ✓ Generated ${questions.length} categorized vet questions.`);
  questions.forEach((q, i) => console.log(`     [${q.category}] ${q.question}`));

  // Test 4: AI Workflow 3 - Smart Service Matching (Emergency)
  console.log('\n4. Testing AI Workflow 3: Smart Service Matching (Emergency)...');
  const emergencyMatch = await aiService.matchService('Stray dog hit by car bleeding heavily in Domlur');
  console.log(`   ✓ Urgency detected: ${emergencyMatch.urgency}`);
  console.log(`   ✓ Category: ${emergencyMatch.detectedCategory}`);
  console.log(`   ✓ Intent: ${emergencyMatch.intentSummary}`);
  if (emergencyMatch.urgency !== 'critical_emergency') {
    throw new Error('Failed to detect critical emergency urgency');
  }

  // Test 5: AI Workflow 3 - Smart Service Matching (Routine)
  console.log('\n5. Testing AI Workflow 3: Smart Service Matching (Routine)...');
  const routineMatch = await aiService.matchService('Puppy vaccination and deworming schedule');
  console.log(`   ✓ Urgency detected: ${routineMatch.urgency}`);
  console.log(`   ✓ Category: ${routineMatch.detectedCategory}`);

  // Test 6: AI Workflow 4 - Information Organisation Demo
  console.log('\n6. Testing AI Workflow 4: Unstructured Information Pipeline...');
  const pipelineDemo = aiService.getUnstructuredInformationPipelineDemo();
  console.log(`   ✓ Found ${pipelineDemo.length} unstructured ingestion demo cases.`);
  pipelineDemo.forEach((src) => {
    console.log(`     Source: ${src.sourceTitle} -> Extracted: ${src.extractedProvider.name} (Conf: ${src.confidenceScore})`);
  });

  console.log('\n✅ All PawCare test cases executed successfully!');
}

runPawCareTests().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
