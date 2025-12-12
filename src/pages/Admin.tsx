import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { CrystalButton } from '@/components/ui/CrystalButton';
import { FrostInput } from '@/components/ui/FrostInput';
import { WinterBackground } from '@/components/ui/WinterBackground';
import { PdfViewer } from '@/components/ui/PdfViewer';
import { registrationService, FirebaseRegistrationData } from '@/lib/registrationService';
import { emailService } from '@/lib/emailService';
import { 
  CheckCircle, 
  XCircle, 
  Eye, 
  Users, 
  Search,
  X,
  Shield,
  Lock,
  LogOut,
  RefreshCw,
  Mail,
  FileText
} from 'lucide-react';

type TeamStatus = 'pending' | 'approved' | 'rejected';
type Team = {
  id: string;
  teamId: string;
  name: string;
  captain: string;
  members: number;
  status: TeamStatus;
  avatar: string;
  projectTitle?: string;
  domain?: string;
  projectIdea?: string;
  createdAt?: any;
  // Store the full Firebase data for email access
  firebaseData?: FirebaseRegistrationData;
};


const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [teams, setTeams] = useState<Team[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailStatus, setEmailStatus] = useState<{ [key: string]: 'sending' | 'success' | 'failed' }>({});
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  
  // Helper function to get team avatar based on domain
  const getTeamAvatar = (domain: string) => {
    const avatars = {
      'Web Development': '🌐',
      'AI/ML': '🤖',
      'Mobile Development': '📱',
      'IoT': '🔌',
      'Blockchain': '⛓️'
    };
    return avatars[domain as keyof typeof avatars] || '💎';
  };

  // Convert Firebase data to Team format
  const convertFirebaseToTeam = (fbData: FirebaseRegistrationData): Team => {
    const captain = fbData.members[0]?.email || 'Unknown Captain';
    return {
      id: fbData.id || '',
      teamId: fbData.teamId || '',
      name: fbData.teamName,
      captain: captain,
      members: fbData.teamSize,
      status: fbData.status,
      avatar: getTeamAvatar(fbData.domain || ''),
      projectTitle: fbData.projectTitle,
      domain: fbData.domain,
      projectIdea: fbData.projectIdea,
      createdAt: fbData.createdAt,
      firebaseData: fbData // Store complete Firebase data
    };
  };

  // Load teams from Firebase
  const loadTeams = async () => {
    setIsLoading(true);
    setError('');
    try {
      const registrations = await registrationService.getAllRegistrations();
      const teamsData = registrations.map(convertFirebaseToTeam);
      setTeams(teamsData);
    } catch (err) {
      setError('Failed to load teams. Please try again.');
      console.error('Error loading teams:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Load teams when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadTeams();
    }
  }, [isAuthenticated]);
  
  // Simple authentication - in real app, use proper authentication
  const handleLogin = async () => {
    setIsLoggingIn(true);
    setLoginError('');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (loginData.username === 'admin' && loginData.password === 'crystalforge2025') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Please try again.');
    }
    setIsLoggingIn(false);
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginData({ username: '', password: '' });
    setLoginError('');
  };
  
  const filteredTeams = teams.filter(
    team => 
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.teamId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.captain.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleApprove = async (teamId: string) => {
    try {
      setEmailStatus(prev => ({ ...prev, [teamId]: 'sending' }));
      
      // Find the team data first
      const team = teams.find(t => t.id === teamId);
      if (!team || !team.firebaseData) {
        throw new Error('Team not found or missing Firebase data');
      }

      // Get team lead email from Firebase data
      const teamLeadMember = team.firebaseData.members.find(member => 
        member.role?.toLowerCase().includes('lead') || 
        member.role?.toLowerCase().includes('captain')
      ) || team.firebaseData.members[0]; // Fallback to first member
      
      const teamLeadEmail = teamLeadMember?.email;
      if (!teamLeadEmail) {
        throw new Error('Team lead email not found');
      }

      // Update status in database
      await registrationService.updateStatus(teamId, 'approved');
      
      // Update local state
      setTeams(teams.map(team => 
        team.id === teamId ? { ...team, status: 'approved' as TeamStatus } : team
      ));

      // Send email notification
      const emailData = {
        teamName: team.name,
        teamCaptain: team.captain,
        teamId: team.teamId,
        status: 'approved' as const,
        projectTitle: team.projectTitle,
        domain: team.domain,
        teamLeadEmail: teamLeadEmail
      };

      const emailSent = await emailService.sendStatusNotification(emailData);
      
      if (emailSent) {
        setEmailStatus(prev => ({ ...prev, [teamId]: 'success' }));
        console.log('Approval email sent successfully to:', teamLeadEmail);
      } else {
        setEmailStatus(prev => ({ ...prev, [teamId]: 'failed' }));
        console.log('Failed to send approval email to:', teamLeadEmail);
      }

    } catch (err) {
      console.error('Error approving team:', err);
      setError(`Failed to approve team. ${err.message}`);
      setEmailStatus(prev => ({ ...prev, [teamId]: 'failed' }));
    }
  };

  const handleReject = async (teamId: string) => {
    try {
      setEmailStatus(prev => ({ ...prev, [teamId]: 'sending' }));
      
      // Find the team data first
      const team = teams.find(t => t.id === teamId);
      if (!team || !team.firebaseData) {
        throw new Error('Team not found or missing Firebase data');
      }

      // Get team lead email from Firebase data
      const teamLeadMember = team.firebaseData.members.find(member => 
        member.role?.toLowerCase().includes('lead') || 
        member.role?.toLowerCase().includes('captain')
      ) || team.firebaseData.members[0]; // Fallback to first member
      
      const teamLeadEmail = teamLeadMember?.email;
      if (!teamLeadEmail) {
        throw new Error('Team lead email not found');
      }

      // Update status in database
      await registrationService.updateStatus(teamId, 'rejected');
      
      // Update local state
      setTeams(teams.map(team => 
        team.id === teamId ? { ...team, status: 'rejected' as TeamStatus } : team
      ));

      // Send email notification
      const emailData = {
        teamName: team.name,
        teamCaptain: team.captain,
        teamId: team.teamId,
        status: 'rejected' as const,
        projectTitle: team.projectTitle,
        domain: team.domain,
        teamLeadEmail: teamLeadEmail
      };

      const emailSent = await emailService.sendStatusNotification(emailData);
      
      if (emailSent) {
        setEmailStatus(prev => ({ ...prev, [teamId]: 'success' }));
        console.log('Rejection email sent successfully to:', teamLeadEmail);
      } else {
        setEmailStatus(prev => ({ ...prev, [teamId]: 'failed' }));
        console.log('Failed to send rejection email to:', teamLeadEmail);
      }

    } catch (err) {
      console.error('Error rejecting team:', err);
      setError(`Failed to reject team. ${err.message}`);
      setEmailStatus(prev => ({ ...prev, [teamId]: 'failed' }));
    }
  };
  
  const getStatusBadge = (status: TeamStatus) => {
    const styles = {
      pending: 'bg-warning/20 text-warning border-warning/30',
      approved: 'bg-success/20 text-success border-success/30',
      rejected: 'bg-destructive/20 text-destructive border-destructive/30',
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };
  
  return (
    <div className="min-h-screen relative overflow-hidden pt-28 pb-16 px-4">
      {/* Winter themed background elements */}
      <WinterBackground />
      
      {!isAuthenticated ? (
        // Login Form
        <div className="max-w-md mx-auto relative z-10">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full glass-ice border border-ice-cyan/30">
              <Lock className="w-4 h-4 text-primary" />
              <span className="font-inter text-sm text-foreground/70">Secure Access</span>
            </div>
            <h1 className="font-space text-4xl md:text-5xl text-glacier-deep font-bold mb-4">
              Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-ice-cyan to-holo-purple">Portal</span>
            </h1>
            <p className="font-inter text-lg text-foreground/60">
              Please authenticate to access the control room
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard className="p-8" variant="diamond">
              <div className="space-y-6">
                <FrostInput
                  label="Username"
                  placeholder="Enter your username"
                  value={loginData.username}
                  onChange={(e) => setLoginData(prev => ({ ...prev, username: e.target.value }))}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                />
                
                <FrostInput
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                />
                
                {loginError && (
                  <motion.div
                    className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {loginError}
                  </motion.div>
                )}
                
                <CrystalButton
                  onClick={handleLogin}
                  isLoading={isLoggingIn}
                  disabled={!loginData.username || !loginData.password}
                  className="w-full"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Access Portal
                </CrystalButton>
                
                <div className="text-center pt-4 border-t border-border">
                  <p className="text-xs text-foreground/50">
                    Demo credentials: admin / crystalforge2025
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      ) : (
        // Admin Dashboard
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-ice border border-ice-cyan/30">
                <Shield className="w-4 h-4 text-primary" />
                <span className="font-inter text-sm text-foreground/70">Admin Portal</span>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={loadTeams}
                  disabled={isLoading}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-ice border border-ice-cyan/30 text-primary hover:bg-ice-cyan/10 transition-colors disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                  <span className="font-inter text-sm">Refresh</span>
                </motion.button>
                <motion.button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-ice border border-destructive/30 text-destructive hover:bg-destructive/10 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogOut className="w-4 h-4" />
                  <span className="font-inter text-sm">Logout</span>
                </motion.button>
              </div>
            </div>
            <h1 className="font-space text-4xl md:text-5xl text-glacier-deep font-bold mb-4">
              Control <span className="text-transparent bg-clip-text bg-gradient-to-r from-ice-cyan to-holo-purple">Room</span>
            </h1>
            <p className="font-inter text-lg text-foreground/60">
              Manage team registrations and approvals
            </p>
          </motion.div>
          
          {error && (
            <motion.div
              className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}
        
        {/* Search and Stats */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Total Teams', value: teams.length, color: 'from-ice-cyan to-holo-blue' },
              { label: 'Pending', value: teams.filter(t => t.status === 'pending').length, color: 'from-warning to-warning/80' },
              { label: 'Approved', value: teams.filter(t => t.status === 'approved').length, color: 'from-success to-success/80' },
              { label: 'Rejected', value: teams.filter(t => t.status === 'rejected').length, color: 'from-destructive to-destructive/80' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <GlassCard className="p-4 text-center" variant="ice" hover3D={false}>
                  <p className="font-inter text-xs text-foreground/60 mb-1">{stat.label}</p>
                  <p className={`font-space text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}>
                    {stat.value}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
          
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40" />
            <input
              type="text"
              placeholder="Search teams by name, Team ID, or captain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-frost pl-12 w-full"
            />
          </div>
        </motion.div>
        
        {/* Teams Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard className="overflow-hidden" variant="diamond" hover3D={false}>
            {isLoading && (
              <div className="p-8 text-center">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
                <p className="font-inter text-foreground/60">Loading teams...</p>
              </div>
            )}
            {!isLoading && teams.length === 0 && (
              <div className="p-8 text-center">
                <Users className="w-8 h-8 mx-auto mb-4 text-foreground/40" />
                <p className="font-inter text-foreground/60">No team registrations found.</p>
              </div>
            )}
            {!isLoading && teams.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-space text-sm text-foreground/70">Team</th>
                    <th className="text-left p-4 font-space text-sm text-foreground/70">Captain</th>
                    <th className="text-left p-4 font-space text-sm text-foreground/70">Members</th>
                    <th className="text-left p-4 font-space text-sm text-foreground/70">Status</th>
                    <th className="text-right p-4 font-space text-sm text-foreground/70">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeams.map((team, index) => (
                    <motion.tr
                      key={team.id}
                      className="border-b border-border/50 hover:bg-ice-frost/30 transition-colors cursor-pointer"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index }}
                      onClick={() => setSelectedTeam(team)}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{team.avatar}</span>
                          <div>
                            <p className="font-inter font-medium text-foreground">{team.name}</p>
                          <p className="font-inter text-xs text-foreground/50">{team.teamId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-inter text-foreground/70">{team.captain}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-1 text-foreground/70">
                          <Users className="w-4 h-4" />
                          <span className="font-inter">{team.members}</span>
                        </div>
                      </td>
                      <td className="p-4">{getStatusBadge(team.status)}</td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <motion.button
                            onClick={(e) => { e.stopPropagation(); setSelectedTeam(team); }}
                            className="p-2 rounded-lg bg-ice-cyan/10 hover:bg-ice-cyan/20 text-primary transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Eye className="w-4 h-4" />
                          </motion.button>
                          {team.status === 'pending' && (
                            <>
                              <motion.button
                                onClick={(e) => { e.stopPropagation(); handleApprove(team.id); }}
                                className="p-2 rounded-lg bg-success/10 hover:bg-success/20 text-success transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                disabled={emailStatus[team.id] === 'sending'}
                              >
                                <CheckCircle className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                onClick={(e) => { e.stopPropagation(); handleReject(team.id); }}
                                className="p-2 rounded-lg bg-destructive/10 hover:bg-destructive/20 text-destructive transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                disabled={emailStatus[team.id] === 'sending'}
                              >
                                <XCircle className="w-4 h-4" />
                              </motion.button>
                            </>
                          )}
                          {/* Email status indicator */}
                          {emailStatus[team.id] && (
                            <div className="flex items-center">
                              {emailStatus[team.id] === 'sending' && (
                                <div className="flex items-center text-blue-400 text-xs">
                                  <RefreshCw className="w-3 h-3 animate-spin mr-1" />
                                  Sending...
                                </div>
                              )}
                              {emailStatus[team.id] === 'success' && (
                                <div className="flex items-center text-green-400 text-xs">
                                  <Mail className="w-3 h-3 mr-1" />
                                  Email sent
                                </div>
                              )}
                              {emailStatus[team.id] === 'failed' && (
                                <div className="flex items-center text-red-400 text-xs">
                                  <XCircle className="w-3 h-3 mr-1" />
                                  Email failed
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            )}
          </GlassCard>
        </motion.div>
        
        {/* Team Detail Modal */}
        <AnimatePresence>
          {selectedTeam && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-glacier-deep/30 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTeam(null)}
            >
              <motion.div
                className="w-full max-w-lg"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <GlassCard className="p-8" variant="diamond" hover3D={false}>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{selectedTeam.avatar}</span>
                      <div>
                        <h3 className="font-space text-xl text-glacier-deep font-bold">{selectedTeam.name}</h3>
                        <p className="font-inter text-sm text-foreground/50">{selectedTeam.teamId}</p>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => setSelectedTeam(null)}
                      className="p-2 rounded-lg hover:bg-foreground/10 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-5 h-5 text-foreground/60" />
                    </motion.button>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="font-inter text-foreground/60">Captain</span>
                      <span className="font-inter font-medium text-foreground">{selectedTeam.captain}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="font-inter text-foreground/60">Team Size</span>
                      <span className="font-inter font-medium text-foreground">{selectedTeam.members} members</span>
                    </div>
                    {selectedTeam.projectTitle && (
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="font-inter text-foreground/60">Project Title</span>
                        <span className="font-inter font-medium text-foreground">{selectedTeam.projectTitle}</span>
                      </div>
                    )}
                    {selectedTeam.domain && (
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="font-inter text-foreground/60">Domain</span>
                        <span className="font-inter font-medium text-foreground">{selectedTeam.domain}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="font-inter text-foreground/60">Status</span>
                      {getStatusBadge(selectedTeam.status)}
                    </div>
                  </div>
                  
                  {/* Student ID Card Section */}
                  {selectedTeam.firebaseData?.studentIdCard && (
                    <div className="mb-6">
                      <h4 className="font-inter text-sm font-medium text-foreground/60 mb-3">Student ID Card</h4>
                      <div className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-cyan-400" />
                            <div>
                              <p className="text-white font-medium text-sm">{selectedTeam.firebaseData.studentIdCard.fileName}</p>
                              <p className="text-white/60 text-xs">
                                {Math.round(selectedTeam.firebaseData.studentIdCard.fileSize / 1024)} KB • 
                                Uploaded {new Date(selectedTeam.firebaseData.studentIdCard.uploadedAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <motion.button
                            onClick={() => setShowPdfViewer(true)}
                            className="px-3 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 text-sm font-medium transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            View PDF
                          </motion.button>
                        </div>
                        <p className="text-amber-200 text-xs mt-2 flex items-center gap-1">
                          <Shield className="w-3 h-3" />
                          This document will be automatically deleted after your decision
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {selectedTeam.projectIdea && (
                    <div className="mb-6">
                      <h4 className="font-inter text-sm font-medium text-foreground/60 mb-2">Project Idea</h4>
                      <div className="p-4 rounded-lg bg-ice-frost/30 border border-border">
                        <p className="font-inter text-sm text-foreground">{selectedTeam.projectIdea}</p>
                      </div>
                    </div>
                  )}
                  
                  {selectedTeam.status === 'pending' && (
                    <div className="flex gap-3">
                      <CrystalButton
                        onClick={() => { handleApprove(selectedTeam.id); setSelectedTeam(null); }}
                        className="flex-1"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </CrystalButton>
                      <CrystalButton
                        variant="ghost"
                        onClick={() => { handleReject(selectedTeam.id); setSelectedTeam(null); }}
                        className="flex-1 border-destructive/30 text-destructive hover:bg-destructive/10"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </CrystalButton>
                    </div>
                  )}
                </GlassCard>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      )}

      {/* PDF Viewer */}
      {selectedTeam?.firebaseData?.studentIdCard && (
        <PdfViewer
          pdfData={selectedTeam.firebaseData.studentIdCard}
          isOpen={showPdfViewer}
          onClose={() => setShowPdfViewer(false)}
          teamName={selectedTeam.name}
        />
      )}
    </div>
  );
};

export default Admin;
