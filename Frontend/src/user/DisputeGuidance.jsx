import React from 'react';

const DisputeGuidance = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 font-sans text-gray-800">
      <h1 className="text-4xl font-bold text-center text-green-700 mb-8">Dispute Resolution Guidance</h1>
       <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Farmer’s Rights and Legal Protection</h2>
        <p>Farmers are entitled to certain legal protections under Indian law. Here's how you can protect your rights:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Farmers have the right to receive fair payments as per the contract terms.</li>
          <li>Contract terms should be clear and provide mutual benefit to both parties.</li>
          <li>Farmers are entitled to access legal counsel in case of disputes.</li>
        </ul>
      </div>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">⚖️ Common Contract Disputes</h2>
        <ul className="list-disc list-inside ml-4">
          <li>Delayed or incomplete payments</li>
          <li>Violation of contract terms</li>
          <li>Disputes over land use or leasing terms</li>
          <li>Low-quality products or supply failure</li>
          <li>Premature contract termination</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">🛠️ Resolution Steps</h2>
        
        <ol className="list-decimal list-inside ml-4 space-y-2">
          
          <li><strong>Initial Communication:</strong> Attempt direct dialogue via call, email, or in-person.</li>
          <li><strong>Written Notice:</strong> Issue a formal complaint letter clearly stating the dispute.</li>
          <li><strong>Mediation:</strong> Approach a neutral party like local agriculture officer or co-op society.</li>
          <li><strong>Legal Action:</strong> If unresolved, escalate to Lok Adalat, Consumer Court, or Civil Court.</li>
          <li><strong>Record Keeping:</strong> Maintain all contracts, messages, payment slips as evidence.</li>
        </ol>
      </section>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Legal Support and Resources</h2>
        <p>Legal support and advice are essential for resolving disputes professionally. Below are some helpful links:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><a href="https://agriwelfare.gov.in/" target="_blank" className="text-blue-500">Ministry of Agriculture and Farmers Welfare</a></li>
          <li><a href="https://ncdrc.nic.in/" target="_blank" className="text-blue-500">National Consumer Disputes Redressal Commission (NCDRC)</a></li>
          <li><a href="https://www.legalserviceindia.com/" target="_blank" className="text-blue-500">Lok Adalat (Alternative Dispute Resolution)</a></li>
          <li><a href="https://www.indianbarassociation.org/" target="_blank" className="text-blue-500">Indian Bar Association (Legal Consultations)</a></li>
        </ul>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">🏛️ Legal Rights and Acts</h2>
        <ul className="list-disc list-inside ml-4">
          <li>Indian Contract Act, 1872</li>
          <li>Essential Commodities Act, 1955</li>
          <li>Model Contract Farming Act</li>
          <li>Farmers’ Produce Trade and Commerce (Promotion and Facilitation) Act</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">📞 Support & Helplines</h2>
        <ul className="list-disc list-inside ml-4">
          <li>Krishi Call Center: <strong>1800-180-1551</strong></li>
          <li>Local Krishi Vigyan Kendras (KVKs)</li>
          <li>District Agriculture Officers</li>
          <li>District Legal Services Authority (DLSA)</li>
        </ul>
      </section>


       <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Filing a Complaint</h2>
        <p>If you’re unable to resolve a dispute on your own, you may file a complaint with the concerned authorities:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>File a complaint with local agricultural authorities or consumer courts.</li>
          <li>Approach the National Agricultural Disputes Portal (if available in your state).</li>
          <li>Use Lok Adalat or mediation services for a faster resolution.</li>
        </ul>
      </div>

      
      

       <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Alternative Dispute Resolution (ADR)</h2>
        <p>Alternative Dispute Resolution (ADR) methods are non-judicial options that can help resolve conflicts faster:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><a href="https://www.lokadalat.nic.in/" target="_blank" className="text-blue-500">Lok Adalat</a>: A platform for resolving disputes with the help of a mediator.</li>
          <li><a href="https://www.indianbarassociation.org/" target="_blank" className="text-blue-500">Mediation and Arbitration</a>: Professional mediators can help resolve disputes between parties without court involvement.</li>
        </ul>
      </div>
      

      <section className="bg-yellow-100 p-4 rounded">
        <p className="text-red-600 font-semibold">❗ Note: Farmers and Corporates are encouraged to seek mediation before legal steps. Always maintain records and seek help early.</p>

             
        <p className="text-red-600 font-semibold">❗ Note: If you need legal assistance or have any questions, consider consulting with a local agricultural lawyer or mediator.</p>
    
      </section>
      
    </div>
  );
};

export default DisputeGuidance;
